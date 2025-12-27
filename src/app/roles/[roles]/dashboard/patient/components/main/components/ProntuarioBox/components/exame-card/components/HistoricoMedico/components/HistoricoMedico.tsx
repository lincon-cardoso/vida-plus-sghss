"use client";

import styles from "./styles/HistoricoMedico.module.scss";

// type Entry = {
//   date?: string;
//   type?: string;
//   doctor?: string;
//   note?: string;
// };

// interface Props {
//   entries?: Entry[];
// }
//   const resolved: Entry[] =
//     entries && entries.length
//       ? entries
//       : [
//           {
//             date: new Date().toLocaleDateString("pt-BR"),
//             type: "—",
//             doctor: "—",
//             note: "Nenhum histórico disponível",
//           },
//         ];

export default function HistoricoMedico() {
  return (
    <section className={styles.historico}>
      <h1>Histórico Médico </h1>
    </section>
  );
}
