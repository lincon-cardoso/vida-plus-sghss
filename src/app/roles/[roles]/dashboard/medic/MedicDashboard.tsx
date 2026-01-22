"use client";

import type { TokenPayload } from "@/lib/auth";
import dynamic from "next/dynamic";
import BarraNavegacaoMedic from "@/app/roles/[roles]/dashboard/medic/components/header/page";

const MedicDashboardMain = dynamic(
  () =>
    import("@/app/roles/[roles]/dashboard/medic/components/main/components/page"),
  { ssr: false },
);

export default function MedicDashboard({ payload }: { payload: TokenPayload }) {
  return (
    <main className="medic-dashboard__page">
      <BarraNavegacaoMedic payload={payload} />
      <div className="medic-dashboard__body">
        <MedicDashboardMain />
      </div>
    </main>
  );
}
