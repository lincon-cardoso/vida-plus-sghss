"use client";

import type { TokenPayload } from "@/lib/auth";
import dynamic from "next/dynamic";
import BarraNavegacaoAdmin from "./components/header/page";

const AdminDashboardMain = dynamic(() => import("./components/main/page"), {
  ssr: false,
});

/**
 * Painel do Administrador — estrutura mínima (header + menu lateral com "Sair").
 */
export default function AdminDashboard({ payload }: { payload: TokenPayload }) {
  return (
    <main className="admin-dashboard__page">
      <BarraNavegacaoAdmin payload={payload} />
      <div className="admin-dashboard__body">
        <AdminDashboardMain />
      </div>
    </main>
  );
}
