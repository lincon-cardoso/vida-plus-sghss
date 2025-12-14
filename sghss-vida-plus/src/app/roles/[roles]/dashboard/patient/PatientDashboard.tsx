import type { TokenPayload } from "@/lib/auth";
import BarraNavegacao from "@/app/roles/[roles]/dashboard/patient/components/header/page";

export default function PatientDashboard({
  payload,
}: {
  payload: TokenPayload;
}) {
  return (
    <main>
      <BarraNavegacao payload={payload} />
    </main>
  );
}
