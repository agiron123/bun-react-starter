import type { User } from "@prisma/client";
import prisma from "./prisma";
import { getTokenFromRequest, verifyAuthToken } from "./auth";

export class UnauthorizedError extends Error {
  status: number;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

export type AuthenticatedUser = Pick<User, "id" | "email" | "createdAt">;

export async function authenticateRequest(request: Request): Promise<AuthenticatedUser> {
  const token = getTokenFromRequest(request);

  if (!token) {
    throw new UnauthorizedError("Missing bearer token");
  }

  let payload: { sub: string; email: string };
  try {
    payload = verifyAuthToken(token);
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  const userId = Number(payload.sub);
  if (!Number.isInteger(userId)) {
    throw new UnauthorizedError("Token payload is invalid");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
}
