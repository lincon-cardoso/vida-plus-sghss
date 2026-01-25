# VidaPlus — Sistema de Gestão Hospitalar (SGHSS)

**VidaPlus** é um protótipo de plataforma web para gestão hospitalar desenvolvido com Next.js e TypeScript. O objetivo é oferecer funcionalidades principais para pacientes, profissionais e gestores: login por perfis, dashboards por role, agendamentos, prontuário e componentes reutilizáveis.

---

## 🚀 Stack

- **Next.js 16** (App Router) • **React 19** • **TypeScript**
- **Prisma** (client) — planejado para persistência (schema ainda não definido)
- **PostgreSQL** (opcional)
- SCSS Modules, SWR, Zod/Joi, Jest + Testing Library

---

## ✅ Estado atual — O que já foi implementado

- Tela de **login** com seleção de perfil (Paciente / Profissional / Gestor). (`src/app/login`)
- Rota de **autenticação (DEV)**: `POST /api/auth` — gera JWT e seta cookie `token` (httpOnly). (`src/app/api/auth/route.ts`)
- **Proteção de rotas** e redirecionamento para dashboards por role (`src/app/roles/[roles]/dashboard/*`).
- Dashboards com componentes de interface: prontuário, diálogo de agendamento, notificações e cards.
- Helpers essenciais: `src/lib/auth.ts` (sign/verify JWT) e `src/lib/nonce.ts` (CSP nonce).
- Componentes acessíveis (ex.: `Modal` com trap de foco, ESC e clique no overlay).

---

## ⚠️ Pendências (o que falta implementar)

Prioridade alta

- Definir e implementar **Prisma schema** (Users, Roles, Appointments, MedicalRecords) e **migrations**.
- Substituir autenticação hardcoded por **autenticação contra DB** com senhas hasheadas (argon2).

Prioridade média

- Implementar **API Routes** para agendamento, prontuário, preferências e exportações.
- Adicionar **testes** (unit, integration e E2E) para fluxos críticos (login, agendamento).
- Implementar **autorização no servidor** (middleware, checagens de role).

Baixa prioridade / melhorias

- Documentação para avaliadores (passos de verificação, credenciais DEV bem documentadas).
- Configurar **CI/CD** e checks automáticos (lint, typecheck, test, security checks).

---

## 📋 Como rodar localmente (resumo)

1. Clonar o repositório

```bash
git clone <repo-url>
cd vida-plus-sghss
```

2. Instalar dependências

```bash
npm install
```

3. Criar `.env` com no mínimo:

```env
NODE_ENV=development
JWT_SECRET=uma_chave_secreta_segura
# DATABASE_URL=postgresql://user:password@host:5432/dbname
```

4. Rodar em dev

```bash
npm run dev
```

Abrir: http://localhost:3000

---

## 🔒 Notas de segurança e credenciais DEV

- **Credenciais de desenvolvimento (DEV)** atualmente em uso para facilitar avaliação:
  - Email: `usuario@gmail.com`
  - Senha: `usuario123`
  - Role: `patient` / `doctor` / `admin`
- Estas credenciais são **temporárias** e devem ser removidas assim que a autenticação com DB estiver disponível.
- **JWT_SECRET** deve estar em `.env` (não comitar valores reais no repositório).

---

## ✅ Checklist rápida de próximas tarefas

- [ ] Criar `schema.prisma` e seeds iniciais (User, Role, Appointment, MedicalRecord)
- [ ] Implementar login contra DB e remover credenciais hardcoded
- [ ] Criar endpoints para agendamento e prontuário
- [ ] Adicionar testes automatizados (unit/integration/E2E)
- [ ] Documentar passos de avaliação e critérios de aceitação

---

## 🤝 Como contribuir

1. Fork → branch `feature/...` → PR com descrição e checklist
2. Execute `npm run lint` e `npm run typecheck`
3. Inclua testes para mudanças críticas

---

Se desejar, eu posso gerar um **template inicial de `schema.prisma`** e um **script de seed** (User + Role + admin) para acelerar as próximas tarefas. Deseja que eu crie isso agora? ✅
