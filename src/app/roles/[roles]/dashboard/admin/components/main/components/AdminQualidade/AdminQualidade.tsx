import styles from "./AdminQualidade.module.scss";
import Auditoria from "./components/Auditoria/Auditoria";
import IndicadoresQualidade from "./components/IndicadoresQualidade/IndicadoresQualidade";
import SameArquivo from "./components/SameArquivo/SameArquivo";
import Satisfacao from "./components/Satisfacao/Satisfacao";

interface Props {
  activeSubLabel?: string | undefined;
}

export default function AdminQualidade({ activeSubLabel }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {activeSubLabel === "Indicadores" && <IndicadoresQualidade />}
        {activeSubLabel === "Satisfação" && <Satisfacao />}
        {activeSubLabel === "Auditoria" && <Auditoria />}
        {activeSubLabel === "SAME (Arquivo)" && <SameArquivo />}
      </div>
    </div>
  );
}
