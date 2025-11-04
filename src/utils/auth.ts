import { validateToken } from "../store/mock-store";

/**
 * Hash a password using Bun's built-in crypto
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

/**
 * Generate a random token string
 */
export function generateToken(): string {
  return crypto.randomUUID();
}

/**
 * Extract token from Authorization header
 * Expects format: "Bearer <token>" or just "<token>"
 */
export function getAuthToken(req: Request): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return null;
  }

  // Handle "Bearer <token>" format
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Handle plain token
  return authHeader;
}

/**
 * Require authentication - validates token and returns userId
 * Returns null if token is invalid or missing
 */
export function requireAuth(req: Request): string | null {
  const token = getAuthToken(req);
  if (!token) {
    return null;
  }

  const tokenData = validateToken(token);
  if (!tokenData) {
    return null;
  }

  return tokenData.userId;
}

/**
 * Create an error response
 */
export function errorResponse(message: string, status: number = 400): Response {
  return Response.json({ error: message }, { status });
}

