export interface User {
  id: string;
  email: string;
  password: string; // hashed password
  username: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string; // plain text password
  username: string;
  firstname: string;
  lastname: string;
}

export interface UpdateUserRequest {
  email?: string;
  password?: string; // plain text password
  username?: string;
  firstname?: string;
  lastname?: string;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface Token {
  token: string;
  userId: string;
  expiresAt: Date;
}

