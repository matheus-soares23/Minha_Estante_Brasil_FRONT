export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin'
}

export interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginDto {
  login: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}
