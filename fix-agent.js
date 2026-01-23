const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  ".github",
  "agents",
  "🚧 Builder — Implementação (Confiável).agent.md",
);
let content = fs.readFileSync(filePath, "utf8");
content = content.replace(/\r\n/g, "\n");

// Encontrar e substituir pela posição usando marcadores únicos
// Buscar sem as aspas para evitar problemas de encoding
const startMarker = "### Modo ";
const startMarkerFull = "sem implementação)";
const endMarker = "**Saída obrigatória:**";

// Encontrar a seção correta
let startIdx = -1;
let searchPos = 0;
while (true) {
  const idx = content.indexOf(startMarker, searchPos);
  if (idx < 0) break;
  // Verificar se é a seção correta (contém "sem implementação")
  const section = content.substring(idx, idx + 100);
  if (section.includes(startMarkerFull)) {
    startIdx = idx;
    break;
  }
  searchPos = idx + 1;
}
const endIdx = startIdx >= 0 ? content.indexOf(endMarker, startIdx) : -1;

console.log("Start index:", startIdx);
console.log("End index:", endIdx);

if (startIdx >= 0 && endIdx > startIdx) {
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);

  const newSection = `### Modo "Avaliação/Explicação" (sem implementação)

> ⚠️ **ALERTA ANTI-DESATUALIZAÇÃO:** MESMO em modo "só explicar", NUNCA responder sobre API/comportamento/sintaxe sem antes:
> 1. Verificar versões do projeto (0.0.1)
> 2. Consultar MCP ou evidência do repo
> 3. Marcar \`[Incerto — confirmar]\` se não houver evidência suficiente
>
> **Justificativa:** Respostas "de cabeça" são a maior fonte de código desatualizado.

Se o usuário pedir **apenas** avaliação/revisão/explicação (ex.: "avalie de 0 a 10", "explique como funciona"), o agente deve:

1. **Verificar versões do projeto** (0.0.1) para ancorar a resposta.
2. Executar consulta MCP obrigatória para explicações técnicas (APIs, frameworks, arquitetura) para garantir previsões e pensamentos atualizados, evitando alucinações — usar timebox e limites acima.
3. Responder com análise e recomendações baseadas em evidência oficial.
4. **Não** editar arquivos ou criar commits, mas **pode rodar comandos no console quando solicitado pelo usuário**

`;

  const result = before + newSection + after;
  fs.writeFileSync(filePath, result, "utf8");
  console.log("✅ Substituição realizada com sucesso!");
} else {
  console.log("❌ Marcadores não encontrados.");
  // Debug - mostrar os primeiros resultados de busca por "Modo"
  let searchIdx = 0;
  for (let i = 0; i < 5; i++) {
    const idx = content.indexOf("Modo", searchIdx);
    if (idx < 0) break;
    console.log(
      `Modo #${i + 1} at ${idx}: ${content.substring(idx, idx + 50)}`,
    );
    searchIdx = idx + 1;
  }
}
