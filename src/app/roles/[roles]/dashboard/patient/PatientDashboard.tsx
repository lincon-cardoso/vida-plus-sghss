import type { TokenPayload } from "@/lib/auth";
import BarraNavegacao from "@/app/roles/[roles]/dashboard/patient/components/header/page";
import PatientDashboardMain from "@/app/roles/[roles]/dashboard/patient/components/main/page";
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
