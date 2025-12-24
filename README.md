# VidaPlus — Sistema de Gestão Hospitalar (SGHSS) ✅

**VidaPlus** é uma plataforma web para gestão hospitalar e serviços de saúde (SGHSS), com foco em agendamento, prontuário do paciente e interfaces separadas por perfis (Paciente, Profissional e Gestor). Este repositório contém uma aplicação frontend e rotas API implementadas em **Next.js + TypeScript**.

---

## 🔍 Visão Geral

- Projeto: VidaPlus — Sistema de Gestão Hospitalar (SGHSS)
- Stack principal: **Next.js 16**, **React 19**, **TypeScript**, **Prisma** (cliente), **Postgres (pg)**
- Autenticação básica via **JWT** (API: `/api/auth`) — atualmente usa credenciais de desenvolvimento hardcoded
- Foco inicial: Dashboard de paciente com agendamento, visualização de prontuário e componentes reutilizáveis

---

## ✨ Recursos implementados (visíveis no código)

- Tela de login com seleção de perfil (Paciente / Profissional / Gestor)
- API de autenticação: `POST /api/auth` que gera JWT e define cookie `token` (httpOnly)
- Dashboard do paciente com componentes:
  - Prontuário (exames, histórico)
  - Agendamento de consultas (diálogo de agendamento)
  - Cartões de compromissos e notificações
- Estrutura de layout com metadados SEO / Open Graph e gerenciamento de nonce CSP

---

## 🧰 Tecnologias

- Next.js (app router)
- React
- TypeScript
- Prisma (client) — schema/BD ainda não incluídos no repositório
- PostgreSQL (via `pg`)
- SWR, Zod, Joi (validações), Sass para estilos
- Testes: Jest + Testing Library

---

## 🚀 Pré-requisitos

- Node.js >= 18
- npm / yarn / pnpm
- (Opcional) PostgreSQL se for usar persistência com Prisma

---

## ⚙️ Configuração local

1. Clone o repositório

```bash
git clone <repo-url>
cd vida-plus-sghss
```

2. Instale dependências

```bash
npm install
# ou
# pnpm install
# ou
# yarn
```

3. Crie um arquivo `.env` na raiz com as variáveis mínimas:

```env
NODE_ENV=development
JWT_SECRET=uma_chave_secreta_segura
# DATABASE_URL=postgresql://user:password@host:5432/dbname
```

> Observação: **o projeto atualmente não inclui schema Prisma** (arquivo `prisma/schema.prisma` está vazio). Você precisará definir o schema e executar `prisma migrate` / `prisma generate` caso queira usar banco de dados.

4. Rodar em modo de desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000

---

## 📋 Scripts úteis

- `npm run dev` — iniciar ambiente de desenvolvimento (Next)
- `npm run build` — gera build (executa `prisma generate` antes)
- `npm run start` — iniciar em produção
- `npm run lint` — rodar ESLint
- `npm run typecheck` — checar tipos TypeScript
- `npm run test` — executar testes com Jest
- `npm run db:generate` — `prisma generate`
- `npm run db:migrate` — `prisma migrate dev`
- `npm run db:studio` — `prisma studio`

---

## 🔒 Observações de segurança / estado atual (importante)

> **Credenciais de desenvolvimento** (DEV):
>
> - **Email:** `linkon789@gmail.com`
> - **Senha:** `link2502`
> - **Role:** `patient`
>
> Essas credenciais estão **hardcoded** em `src/app/api/auth/route.ts` apenas para facilitar desenvolvimento. Substitua por uma integração real (banco de dados e verificação segura) antes de ir a produção.

- O JWT é assinado usando `JWT_SECRET` (ver `src/lib/auth.ts`). Certifique-se de definir `JWT_SECRET` em `.env` em ambiente real.
- Cookie `token` é setado como `httpOnly` e `secure` quando `NODE_ENV === 'production'`.

---

## 🧭 Estrutura do projeto (resumo)

- `src/app` – rotas do Next (páginas e layouts)
  - `login/` – UI de login
  - `roles/[roles]/dashboard/...` – dashboards por perfil (patient, doctor, admin)
  - `api/auth/route.ts` – endpoint de autenticação (POST)
- `src/lib` – utilitários (auth, nonce, prisma client)
- `public/` – ícones, imagens
- `prisma/` – schema e migrations (vazio atualmente)

---

## ✅ Pontos pendentes / Sugestões de melhoria

- Implementar persistência real (Prisma schema + migrations + seeds)
- Remover credenciais hardcoded e criar rota de autenticação com banco (hash de senha / argon2)
- Implementar roles e autorização no servidor (middleware/route guards)
- Adicionar testes e coverage para APIs e componentes importantes
- Configurar CI/CD e checklist de segurança (rotas, CSP, HSTS)

---

## 🤝 Contribuição

1. Fork → branch feature → PR com descrição clara
2. Siga as regras de ESLint / TypeScript
3. Adicione testes para alterações críticas

---

## 📄 Licença

Defina a licença do projeto (ex: MIT) adicionando um arquivo `LICENSE` na raiz.

---

Se quiser, eu posso:

- Gerar um template de `schema.prisma` e script de seed inicial ✅
- Remover as credenciais hardcoded e substituir por um fluxo de autenticação com SQLite/Postgres e Prisma ✅
