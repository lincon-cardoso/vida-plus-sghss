"use client";

import type { TokenPayload } from "@/lib/auth";
import dynamic from "next/dynamic";
import BarraNavegacao from "@/app/roles/[roles]/dashboard/patient/components/header/page";

const PatientDashboardMain = dynamic(
  () => import("@/app/roles/[roles]/dashboard/patient/components/main/page"),
  { ssr: false }
);

export default function PatientDashboard({
  payload,
}: {
  payload: TokenPayload;
}) {
  return (
    <main className="patient-dashboard__page">
      <BarraNavegacao payload={payload} />
      <div className="patient-dashboard__body">
        <PatientDashboardMain />
      </div>
    </main>
  );
}
