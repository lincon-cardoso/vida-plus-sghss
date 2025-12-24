// src/lib/nonce.ts
import { headers } from "next/headers";

/**
 * Obtém o nonce CSP para uso em scripts inline
 * Usar apenas em Server Components
 *
 * @example
 * import { getNonce } from "@/lib/nonce";
 *
 * export default async function Page() {
 *   const nonce = await getNonce();
 *   return <script nonce={nonce}>...</script>;
 * }
 */
export async function getNonce(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-nonce") ?? "";
}
