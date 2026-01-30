/**
 * Credenciais de desenvolvimento (DEV)
 * - Usar apenas em ambiente local para facilitar avaliação.
 * - Remover/substituir quando a autenticação contra DB estiver pronta.
 */

export type RoleId = "patient" | "doctor" | "admin";

export const DEV_ROLES: RoleId[] = ["patient", "doctor", "admin"];

export const DEV_EMAIL = "usuario@gmail.com";
export const DEV_SENHA = "senha123";
