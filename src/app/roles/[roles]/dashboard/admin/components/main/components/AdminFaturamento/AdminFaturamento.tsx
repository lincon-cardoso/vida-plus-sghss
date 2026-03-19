import styles from "./AdminFaturamento.module.scss";
import RelatoriosFaturamento from "./components/RelatoriosFaturamento/RelatoriosFaturamento";
import TissOperadoras from "./components/TissOperadoras/TissOperadoras";

interface Props {
  activeSubLabel?: string | undefined;
}

export default function AdminFaturamento({ activeSubLabel }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {activeSubLabel === "Relatórios" && <RelatoriosFaturamento />}
        {activeSubLabel === "TISS (Operadoras)" && <TissOperadoras />}
      </div>
    </div>
  );
}
