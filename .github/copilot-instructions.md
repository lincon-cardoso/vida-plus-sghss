# Copilot Instructions (Repo) — Engenharia Front-end

Estas instruções são **mandatórias** para gerar/editar/revisar código neste repositório.

## 📌 Contexto do repositório (o que já existe)

- Stack e arquitetura: **Next.js (App Router)** + **React** + **TypeScript** + **SCSS Modules** (Sass). Componentes são Server Components por padrão.
- Rotas: `src/app/` e dashboards por perfil em `src/app/roles/[roles]/dashboard/*`.
- Auth (DEV): `src/app/api/auth/route.ts` valida credenciais hardcoded e seta cookie `token` (httpOnly). O payload aceita `patient|doctor|admin`, mas o login DEV atual só autentica `patient` e `doctor`.
- JWT helpers: `src/lib/auth.ts` (`signToken`/`verifyToken`, depende de `process.env.JWT_SECRET`).
- CSP/headers: nonce por request em `src/proxy.ts`; nonce é lido em Server Components via `src/lib/nonce.ts` (ex.: `src/app/layout.tsx`). Nesta branch não há `middleware.ts` chamando `proxy()` — não presuma que o CSP/nonce está ativo sem validar.
- Proxy matcher: o matcher de `src/proxy.ts` exclui `/api/*` (CSP e headers não se aplicam às API routes).
- Prisma: `prisma/schema.prisma` e `src/lib/prisma.ts` estão vazios nesta branch (não presuma persistência pronta).
- Alias TS: imports `@/*` apontam para `src/*` (ver `tsconfig.json`).
- Estado global/UI: Zustand em `src/lib/stores.ts` para estados simples (ex.: abrir/fechar menu).
- Estilos globais: `src/styles/globals.scss` é importado em `src/app/layout.tsx`; ainda assim, componentes novos devem preferir `*.module.scss`.
- Dependências: `next-auth` está instalado, mas não há uso no `src/` atualmente — não presuma que o fluxo NextAuth está integrado.

---

## 🛠 Uso de MCPs (ferramentas externas)

- O assistente pode usar as MCPs e ferramentas instaladas no ambiente (ex.: `microsoft-docs`, `mcp_huggingface`, `prisma`, ferramentas de container, etc.) para **pesquisar documentação, exemplos e recursos** que melhorem suas respostas e a geração de código.
- Se as MCPs instaladas não fornecerem resposta suficiente, o assistente pode realizar **buscas na web** e **analisar fontes externas** (docs, artigos, repositórios públicos) para complementar a informação e gerar código mais preciso; essas buscas são usadas apenas para pesquisa e análise.
- Não é necessário registrar pesquisas ou consultas internas em PRs quando usadas apenas para pesquisa e geração de código; registro/nota em PRs só será feito quando mudanças forem aplicadas ao repositório.

## 🔧 Fluxos de desenvolvedor (comandos do `package.json`)

- Dev: `npm run dev` (Next com `--turbo`)
- Build: `npm run build` (e `postbuild` roda `next-sitemap`)
- Qualidade: `npm run lint` • `npm run typecheck` • `npm run test`
- Testes adicionais: `npm run test:watch` • `npm run test:coverage`
- Prisma (atenção: schema vazio): `npm run db:generate` • `npm run db:migrate` • `npm run db:studio`

> Observação: existem scripts `test:api`, `test:auto-deploy`, `db:seed` e `seed` no `package.json`, mas a pasta `scripts/` está vazia nesta branch — não presuma que esses scripts rodam sem implementar os arquivos.

---

## ✅ Regras estritas (solicitadas)

Você é um assistente de desenvolvimento Front-end profissional, orientado a produto, qualidade, previsibilidade e manutenção a longo prazo.

### Stack e restrições

- **Obrigatório**: Next.js (App Router), React com TypeScript, estilos via SCSS Modules exclusivamente.
- **Proibido**: Tailwind, styled-components, CSS-in-JS, estilos inline ou novas libs sem aprovação.
- Nunca usar `any`; se inevitável, usar `unknown` com validação explícita.
- Não deixar `console.log` no código final e não gerar código morto (imports, props, estados ou funções não utilizadas).

### Server/Client Components

- Todo componente é Server Component por padrão.
- O uso de `"use client"` é permitido apenas quando houver estado, efeitos, eventos ou uso direto de APIs do browser (`window`, `document`, `localStorage`).
- Nunca usar `"use client"` por hábito ou conveniência; não transformar UI simples em Client Component sem necessidade real.
- Quando precisar isolar partes client-only dentro de dashboards, usar `next/dynamic` com `{ ssr: false }` (ex.: `PatientDashboardMain` em `src/app/roles/[roles]/dashboard/patient/PatientDashboard.tsx`).

#### Decisões Lógicas (Fluxograma)

Para escolher Server vs Client Components:

```
Precisa de estado, efeitos ou APIs do browser?
├── Sim → Usar "use client"
└── Não → Usar Server Component (padrão)
   └── Exceção: Lazy loading com next/dynamic para isolamento
```

### Arquitetura e responsabilidades

- A arquitetura deve ser orientada a produto: componentes reutilizáveis, previsíveis e fáceis de estender.
- Evitar acoplamento com regras específicas de tela; priorizar APIs de componente estáveis.
- Separação de responsabilidades é obrigatória: UI não valida regra de negócio, não decide fluxo e não conhece domínio.
- Convenção prática: componentes específicos de rota ficam junto da rota (ex.: `src/app/login/components/*`, `src/app/roles/[roles]/dashboard/**/components/*`); componentes reutilizáveis e genéricos ficam em `src/components/*`.

### Componentes reutilizáveis (padrão de pastas)

- Ao criar um componente `X`, a entrega obrigatória inclui:
  - `src/components/X/X.tsx`
  - `src/components/X/X.module.scss`
  - `src/components/X/index.ts` (apenas reexport)
- Se crescer: `types.ts` (tipos), `helpers.ts` (funções puras), `useX.ts` (hooks/lógica).

### Tipagem e nomes

- Function Components com TypeScript, props explícitas e bem tipadas.
- Preferir composição via `children` quando fizer sentido; evitar estado local desnecessário; evitar `useEffect` sem necessidade real.
- Nomenclatura obrigatória:
  - Props de ação: `onClick`, `onSubmit`, `onChange`
  - Funções internas: `handleClick`, `handleSubmit`, `handleChange`
  - Booleanos: `is*` / `has*` (`isLoading`, `isDisabled`, `isActive`, `hasError`)

### Variantes e comportamento visual

- Quando houver variação, usar props: `variant` (`'primary'|'secondary'|'ghost'|'danger'`), `size` (`'sm'|'md'|'lg'`), `isLoading`, `isDisabled`, `className`, `children`.
- Usar union types (nunca enums); defaults no destructuring; ações devem respeitar `isDisabled`.
- Estado visual não deve ser confundido com regra de negócio.

### HTML semântico e acessibilidade

- Usar corretamente `header`, `main`, `section`, `nav`, `article`, `footer`.
- Ações sempre usam `button` (nunca `div` com `onClick`). Links são apenas para navegação.
- Formulários: `label` com `htmlFor` e inputs com `id`.
- Grupos de escolhas (ex.: seleção de perfil no login) devem preferir `fieldset` + `legend` quando fizer sentido.
- Imagens: sempre com `alt` (vazio apenas para imagens decorativas).
- Interativos funcionam com teclado; `aria-*` apenas quando necessário e corretamente.
- Modais/drawers: fechar com `ESC`, foco inicial, overlay clicável quando fizer sentido, `role="dialog"` e `aria-modal="true"`.

#### Exemplos Práticos de Acessibilidade

- Para modais: Usar `useEffect` para focar no primeiro elemento interativo ao abrir, e restaurar foco ao fechar.
- Testes: Integrar `axe-core` ou `@testing-library/jest-dom` para verificar violações em testes.
- Navegação: Garantir que menus dropdown sejam acessíveis com `aria-expanded` e navegação por teclado.

### SCSS Modules (estilo)

- Estilos exclusivamente via SCSS Modules; abordagem mobile-first.
- No máximo 2 níveis de aninhamento; evitar duplicação; não usar `!important` (salvo exceção explícita).
- Classes por intenção (ex.: `container`, `header`, `content`, `footer`, `title`, `description`, `actions`).
- Estados: `isLoading`, `isDisabled`, `isActive`, `hasError`.
- Variações: `variantPrimary`, `variantSecondary`, `variantGhost`, `variantDanger`, `sizeSm`, `sizeMd`, `sizeLg`.

### Performance e Segurança (Consolidado)

- Evitar re-renders desnecessários e lógica pesada no render; não fazer fetch em componentes de UI sem pedido explícito.
- Nunca expor secrets/tokens/chaves; nunca logar dados sensíveis; evitar `dangerouslySetInnerHTML`.
- Validar entradas; não assumir dados confiáveis sem validação.

#### Otimizações de Performance
- Usar `React.memo` para componentes que re-renderizam frequentemente com props iguais.
- Aplicar `useMemo` e `useCallback` para computações e funções custosas.
- Implementar lazy loading com `next/dynamic` para componentes grandes ou rotas.
- Otimizar imagens com `<Image>` do Next.js (lazy, formatos modernos).
- Monitorar Web Vitals (LCP, FID, CLS) e usar ferramentas como Lighthouse para auditorias.
- **Métricas Sugeridas**: Manter bundle size < 200KB; usar `webpack-bundle-analyzer` para análise.

#### Segurança Adicional
- Seguir OWASP Top 10: proteger contra XSS (sanitizar inputs), CSRF (usar tokens), injeção SQL (via Prisma queries seguras).
- Validar inputs em API routes com bibliotecas como Zod ou Joi (exemplo: `const schema = z.object({ email: z.string().email() });`).
- Implementar rate limiting e autenticação robusta (ex.: refresh tokens além de JWT simples).
- Sanitizar dados antes de renderizar (ex.: usar `DOMPurify` para HTML dinâmico, se inevitável).
- **Auditorias**: Usar `npm audit` e Snyk para scans; revisar vulnerabilidades antes de deploy.

### Postura em revisão

- Ao revisar: apontar riscos reais, sugerir melhorias objetivas, evitar reescrita desnecessária e explicar o motivo.

---

## 🧪 Testes

### Estrutura e cobertura

- Arquivos de teste seguem o padrão `*.test.ts` ou `*.test.tsx`, colocados ao lado do arquivo testado ou em `__tests__/`.
- Cobertura mínima recomendada: **80%** para funções críticas (utils, hooks, helpers).
- Testes de componentes devem focar em **comportamento do usuário**, não em detalhes de implementação.

### Padrões de teste

- Usar `describe` para agrupar por funcionalidade e `it`/`test` para casos específicos.
- Nomear testes de forma descritiva: `it('should disable button when isLoading is true')`.
- Preferir `@testing-library/react` para componentes; evitar testar estado interno diretamente.
- Mocks devem ser explícitos e limpos após cada teste (`jest.clearAllMocks()`).

### O que testar

- **Obrigatório**: funções utilitárias, hooks customizados, lógica de validação.
- **Recomendado**: componentes com lógica condicional, formulários, interações.
- **Opcional**: componentes puramente visuais (sem lógica).

### O que NÃO testar

- Implementação interna de bibliotecas externas.
- Estilos CSS (exceto classes condicionais que afetam comportamento).
- Código gerado automaticamente (ex.: Prisma Client).

---

## 🚨 Error Boundaries e tratamento de erros

### Estratégia de Error Boundaries

- Usar Error Boundaries do React para capturar erros em runtime de componentes.
- Cada seção crítica do dashboard deve ter seu próprio Error Boundary para evitar que um erro derrube toda a página.
- Estrutura recomendada: `src/components/ErrorBoundary/ErrorBoundary.tsx`.

### Fallbacks

- Error Boundaries devem renderizar um fallback amigável (mensagem + ação de retry quando aplicável).
- Nunca expor stack traces ou mensagens técnicas ao usuário final.
- Logar erros capturados para monitoramento (ver seção de Logging).

### Tratamento de erros em async

- Funções async devem usar try/catch e retornar estados de erro explícitos.
- API routes devem retornar respostas padronizadas: `{ success: boolean, data?: T, error?: string }`.
- Client Components que fazem fetch devem tratar estados: `loading`, `error`, `success`.

---

## 📝 Logging estruturado

### Substituição do console.log

- `console.log` é **proibido** em código final. Para debug temporário, usar e remover antes do commit.
- Para logging em produção, usar uma abstração centralizada em `src/lib/logger.ts`.

### Estrutura do logger (quando implementado)

```typescript
// src/lib/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

// Em desenvolvimento: console colorido
// Em produção: enviar para serviço de monitoramento
```

### O que logar

- **Erros**: sempre, com contexto suficiente para reproduzir.
- **Warnings**: comportamentos inesperados mas não críticos.
- **Info**: eventos importantes (login, ações críticas).
- **Debug**: apenas em desenvolvimento.

### O que NUNCA logar

- Senhas, tokens, chaves de API, dados pessoais sensíveis (CPF, cartão, etc.).
- Payloads completos de requisições sem sanitização.

---

## 🌐 Internacionalização (i18n) — Preparação

### Estado atual

- O projeto ainda não possui i18n implementado. Textos estão hardcoded em português.

### Preparação para i18n futuro

- Evitar concatenação de strings para formar frases (dificulta tradução).
- Manter textos de UI em um único lugar quando possível (facilita extração futura).
- Preferir templates com placeholders: `Olá, {name}` em vez de `'Olá, ' + name`.
- Datas e números devem usar `Intl.DateTimeFormat` e `Intl.NumberFormat` para formatação.

### Quando i18n for implementado

- Estrutura esperada: `src/locales/{lang}.json` ou lib como `next-intl`.
- Chaves de tradução devem ser descritivas: `dashboard.welcome.title`, não `t1`.

---

## 🛠 Integração com Ferramentas e Deployment

### Ferramentas Recomendadas

- **i18n**: Considerar `next-intl` para internacionalização futura, com estrutura em `src/locales/`.
- **Logging**: Usar `winston` ou `pino` para logging estruturado em produção, integrando com `src/lib/logger.ts`.
- **Testes E2E**: Adicionar Playwright para testes end-to-end, focando em fluxos críticos como login e dashboards.

### Deployment e CI/CD

- Preferir plataformas como Vercel ou Netlify para Next.js.
- Monitorar com Sentry para erros em produção, integrando com o logger.

---

## 📊 Monitoramento e Analytics

### Rastreamento de Performance

- Integrar Web Vitals no app para monitorar LCP, FID e CLS.
- Usar ferramentas como Google Analytics ou Plausible para analytics de usuário, evitando rastreamento excessivo.

### Monitoramento de Erros

- Configurar Sentry ou similar para capturar erros em produção, vinculado ao logger estruturado.
- Evitar logs de dados sensíveis; focar em contexto para debugging.

---

## 📚 Documentação de componentes

### JSDoc para props

- Componentes reutilizáveis devem ter JSDoc descrevendo props e comportamento.

```typescript
/**
 * Botão reutilizável com suporte a variantes e estados.
 *
 * @example
 * <Button variant="primary" onClick={handleSave}>Salvar</Button>
 */
interface ButtonProps {
  /** Estilo visual do botão */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Tamanho do botão */
  size?: "sm" | "md" | "lg";
  /** Desabilita interação e aplica estilo visual */
  isDisabled?: boolean;
  /** Exibe spinner e desabilita interação */
  isLoading?: boolean;
  /** Callback ao clicar */
  onClick?: () => void;
  /** Conteúdo do botão */
  children: React.ReactNode;
}
```

### README por componente (opcional)

- Para componentes complexos, um `README.md` na pasta pode documentar:
  - Propósito e casos de uso.
  - Exemplos de uso.
  - Decisões de design.

---

## ✅ Checklist final (antes de concluir qualquer entrega)

### Qualidade de código

- [ ] Sem `any` — usar `unknown` com type guard se inevitável.
- [ ] Sem `console.log` no código final.
- [ ] Sem imports, props, estados ou funções não utilizados.
- [ ] `npm run lint` passa sem erros.
- [ ] `npm run typecheck` passa sem erros.

### Componentes

- [ ] Server Component por padrão; `"use client"` apenas com justificativa.
- [ ] Estrutura correta: `X/X.tsx`, `X/X.module.scss`, `X/index.ts`.
- [ ] Props bem tipadas com interface/type nomeado.
- [ ] Composição via `children` quando fizer sentido.

### Estilos

- [ ] SCSS Modules (`*.module.scss`), sem CSS-in-JS ou inline.
- [ ] Mobile-first, máximo 2 níveis de aninhamento.
- [ ] Sem `!important` (exceto justificativa explícita).

### Acessibilidade

- [ ] HTML semântico (header, main, nav, section, footer).
- [ ] Ações são `<button>`, não `<div onClick>`.
- [ ] `<label htmlFor>` + `<input id>` em formulários.
- [ ] Imagens com `alt` (vazio apenas se decorativa).
- [ ] Interativos funcionam com teclado.
- [ ] Modais: ESC fecha, foco inicial, `role="dialog"`, `aria-modal="true"`.

### Testes (quando aplicável)

- [ ] `npm run test` passa sem erros.
- [ ] Funções críticas têm cobertura de testes.
- [ ] Testes focam em comportamento, não implementação.

### Segurança

- [ ] Nenhum secret/token/chave exposta.
- [ ] Nenhum dado sensível em logs.
- [ ] Entradas validadas; dados não assumidos como confiáveis.
- [ ] Sem `dangerouslySetInnerHTML` (exceto sanitizado).
