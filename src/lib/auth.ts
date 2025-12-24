// src/lib/auth.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const DEFAULT_EXPIRES_IN = "1d";

export type TokenPayload = {
  email: string;
  role: "patient" | "doctor" | "admin";
  iat?: number;
  exp?: number;
};

export function signToken(
  payload: { email: string; role: TokenPayload["role"] },
  options?: jwt.SignOptions
) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: DEFAULT_EXPIRES_IN,
    ...(options || {}),
  });
}

export function verifyToken(token: string): TokenPayload {
  // lança se inválido/expirado, trate na rota ou server component
  const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
  return decoded;
}
