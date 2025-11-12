import type { User, Token } from "../types/user";

// In-memory storage
const users = new Map<string, User>();
const tokens = new Map<string, Token>();

// Token expiration: 24 hours
const TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000;

// User CRUD operations
export function createUser(user: User): void {
  users.set(user.id, user);
}

export function getUser(id: string): User | undefined {
  return users.get(id);
}

export function updateUser(id: string, updates: Partial<Omit<User, "id" | "createdAt">>): User | null {
  const user = users.get(id);
  if (!user) {
    return null;
  }

  const updatedUser: User = {
    ...user,
    ...updates,
    id: user.id,
    createdAt: user.createdAt,
  };

  users.set(id, updatedUser);
  return updatedUser;
}

export function deleteUser(id: string): boolean {
  // Also delete all tokens for this user
  for (const [token, tokenData] of tokens.entries()) {
    if (tokenData.userId === id) {
      tokens.delete(token);
    }
  }
  return users.delete(id);
}

export function findUserByEmail(email: string): User | undefined {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

export function findUserByUsername(username: string): User | undefined {
  for (const user of users.values()) {
    if (user.username === username) {
      return user;
    }
  }
  return undefined;
}

// Token operations
export function createToken(userId: string): Token {
  const token: Token = {
    token: crypto.randomUUID(),
    userId,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRATION_MS),
  };

  tokens.set(token.token, token);
  return token;
}

export function validateToken(tokenString: string): Token | null {
  const token = tokens.get(tokenString);
  if (!token) {
    return null;
  }

  // Check if token has expired
  if (token.expiresAt < new Date()) {
    tokens.delete(tokenString);
    return null;
  }

  return token;
}

export function deleteToken(tokenString: string): boolean {
  return tokens.delete(tokenString);
}

// Helper to clean up expired tokens (optional, can be called periodically)
export function cleanupExpiredTokens(): number {
  let cleaned = 0;
  const now = new Date();
  for (const [token, tokenData] of tokens.entries()) {
    if (tokenData.expiresAt < now) {
      tokens.delete(token);
      cleaned++;
    }
  }
  return cleaned;
}

