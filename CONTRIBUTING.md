# Contribuindo

Este repositório segue um conjunto estrito de regras para manter previsibilidade, acessibilidade e consistência.

## Fonte de verdade

- Regras do repo: veja .github/copilot-instructions.md
- Padrões de implementação (Builder): .github/agents/🚧 Builder — Implementação (Confiável).agent.md
- Padrões de auditoria (Reviewer): .github/agents/🔍 Reviewer — Auditoria (Conservador).agent.md

## Fluxo recomendado (solo ou em time)

1. Abra/atualize uma issue com escopo e critérios.
2. Implemente com mudanças mínimas e previsíveis.
3. Rode localmente:
   - npm run lint
   - npm run typecheck
   - npm run test (quando aplicável)
4. Abra PR preenchendo o template (inclui Handoff para Auditoria).

## Regras rápidas (resumo)

- Sem Tailwind, sem CSS-in-JS, sem estilos inline — usar SCSS Modules.
- Sem `any` (use `unknown` com validação explícita quando inevitável).
- Sem `console.log` no código final.
- Server Components por padrão; "use client" apenas quando houver estado/efeitos/eventos/APIs do browser.
- Não adicionar dependências sem aprovação explícita.

## Scripts

- npm run dev
- npm run lint
- npm run typecheck
- npm run test

## CI

Pull Requests e pushes em `main` rodam CI com lint/typecheck/test. Se o CI falhar, trate como bloqueador antes de merge.
