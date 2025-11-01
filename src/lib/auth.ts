import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? Bun.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn(
    "JWT_SECRET is not set. Using insecure default secret for development only."
  );
}

const FALLBACK_SECRET = "change-me-in-production";

const secret = JWT_SECRET ?? FALLBACK_SECRET;

export type AuthTokenPayload = {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
};

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createAuthToken(payload: AuthTokenPayload, expiresIn = "7d"): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, secret) as AuthTokenPayload;
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}
