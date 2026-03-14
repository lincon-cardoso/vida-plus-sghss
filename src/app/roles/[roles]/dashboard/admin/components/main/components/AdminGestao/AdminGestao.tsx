import styles from "./AdminGestao.module.scss";
import Agendamentos from "./components/Agendamentos/Agendamentos";
import EscalasPlantao from "./components/EscalasPlantao/EscalasPlantao";
import EstoqueFarmacia from "./components/EstoqueFarmacia/EstoqueFarmacia";
import GestaoFinanceira from "./components/GestaoFinanceira/GestaoFinanceira";
import Profissionais from "./components/Profissionais/Profissionais";
import RelatoriosFluxo from "./components/RelatoriosFluxo/RelatoriosFluxo";

interface Props {
  activeSubLabel?: string | undefined;
}

export default function AdminGestao({ activeSubLabel }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {activeSubLabel === "Profissionais" && <Profissionais />}
        {activeSubLabel === "Agendamentos" && <Agendamentos />}
        {activeSubLabel === "Escalas/Plantões" && <EscalasPlantao />}
        {activeSubLabel === "Estoque/Farmácia" && <EstoqueFarmacia />}
        {activeSubLabel === "Gestão Financeira" && <GestaoFinanceira />}
        {activeSubLabel === "Relatórios de Fluxo" && <RelatoriosFluxo />}
      </div>
    </div>
  );
}
