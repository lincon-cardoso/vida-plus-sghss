import styles from "./AdminAssistencial.module.scss";
import GestaoLeitos from "./components/GestaoLeitos/GestaoLeitos";
import Triagem from "./components/Triagem/Triagem";
import Laboratorio from "./components/Laboratorio/Laboratorio";
import CuidadosEnfermagem from "./components/CuidadosEnfermagem/CuidadosEnfermagem";
import BancoSangue from "./components/BancoSangue/BancoSangue";
import CentroCirurgico from "./components/CentroCirurgico/CentroCirurgico";
import Vacinacao from "./components/Vacinacao/Vacinacao";

interface Props {
  activeSubLabel?: string | undefined;
}

/**
 * Componente principal da seção Assistencial.
 * É um Client Component apenas para gerenciar foco acessível quando o usuário
 * seleciona um subitem. Recebe `activeSubLabel` para renderizar o subcomponente correspondente.
 */
export default function AdminAssistencial({ activeSubLabel }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {activeSubLabel === "Gestão de Leitos" && <GestaoLeitos />}
        {activeSubLabel === "Triagem" && <Triagem />}
        {activeSubLabel === "Laboratório" && <Laboratorio />}
        {activeSubLabel === "Cuidados de Enfermagem" && <CuidadosEnfermagem />}
        {activeSubLabel === "Banco de Sangue" && <BancoSangue />}
        {activeSubLabel === "Centro Cirúrgico" && <CentroCirurgico />}
        {activeSubLabel === "Vacinação" && <Vacinacao />}
      </div>
    </div>
  );
}
