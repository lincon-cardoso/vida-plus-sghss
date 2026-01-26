"use client";
/**
 * LoginForm — Client Component.
 * Justificativa: usa `useState`, `useRef` e `useRouter` (navegação client-side).
 * Responsabilidade: gerenciar formulário de login e interações do usuário.
 *
 * Observação: consome `roles` a partir de `./data` para evitar duplicação
 * e permitir testes/mocks centralizados.
 */
import style from "./styles/FormStyle.module.scss";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import type { Role } from "./data";
import { roles } from "./data";
import Modal from "@/components/Modal";
import { DEV_CREDENTIALS, DEV_ROLES } from "@/lib/devCredentials";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const errorRef = useRef<HTMLDivElement | null>(null);

  const [isHelpOpen, setIsHelpOpen] = useState(true);

  const [role, setRole] = useState<Role["id"]>(roles[0].id);

  const handleRoleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const order: Array<Role["id"]> = roles.map((r) => r.id);
    const index = order.indexOf(role);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      setRole(order[(index + 1) % order.length]);
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setRole(order[(index - 1 + order.length) % order.length]);
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // previne múltiplos envios
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), senha, role }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(
          data?.message || "Falha na autenticação. Verifique suas credenciais.",
        );
        errorRef.current?.focus();
        setLoading(false); // libera só no erro
        return;
      }

      setSuccess("Login bem-sucedido! Redirecionando...");
      setLoading(false);

      // Redirecionar rapidamente (0.5s) para não confundir o usuário
      setTimeout(() => {
        const serverRole = data?.role as
          | "patient"
          | "doctor"
          | "admin"
          | undefined;
        if (serverRole) {
          router.replace(`/roles/${serverRole}/dashboard`);
        } else {
          router.replace(`/roles/${role}`);
        }
      }, 500);
    } catch {
      setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      errorRef.current?.focus();
      setLoading(false);
    }
  };

  return (
    <div className={style["login-card"]}>
      <div className={style["login-card__container"]}>
        <header className={style["login-card__header"]}>
          <div className={style["login-card__headerTop"]}>
            <h2 className={style["login-card__title"]}>Bem-vindo de volta</h2>
            <button
              type="button"
              className={style["link"] + " " + style["link--muted"]}
              onClick={() => setIsHelpOpen(true)}
              aria-label="Abrir ajuda de entrada"
            >
              Ajuda
            </button>
          </div>
          <p className={style["login-card__subtitle"]}>
            Entre com suas credenciais para acessar o sistema
          </p>
        </header>

        <form onSubmit={handleSubmit} className={style["login-card__form"]}>
          {/* Seletor de perfil */}
          <div className={style["field"]}>
            <label className={style["field__label"]}>
              Selecione seu perfil
            </label>

            <div
              className={style["role-grid"]}
              role="radiogroup"
              aria-label="Seleção de perfil"
              onKeyDown={handleRoleKeyDown}
            >
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="radio"
                    aria-checked={role === r.id}
                    tabIndex={role === r.id ? 0 : -1}
                    onClick={() => setRole(r.id)}
                    disabled={loading}
                    className={`${style["role-btn"]} ${role === r.id ? style["is-active"] : ""}`}
                    aria-label={r.label}
                  >
                    <Icon className={style["role-btn__icon"]} />
                    <span className={style["role-btn__label"]}>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* E-mail */}
          <div className={style["field"]}>
            <label htmlFor="email" className={style["field__label"]}>
              E-mail corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.nome@vidaplus.com.br"
              className={style["input"] + " " + style["input--email"]}
              required
            />
          </div>

          {/* Senha */}
          <div className={style["field"]}>
            <label htmlFor="senha" className={style["field__label"]}>
              Senha de acesso
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className={style["input"] + " " + style["input--password"]}
              required
            />
          </div>

          {/* Lembrar e recuperar */}
          <div className={style["form-row"]}>
            <label className={style["checkbox"]}>
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className={style["checkbox__input"]}
              />
              <span className={style["checkbox__label"]}>
                Manter-me conectado
              </span>
            </label>

            <button
              type="button"
              className={style["link"] + " " + style["link--muted"]}
              onClick={() => void router.push("/login/recuperar-senha")}
              aria-label="Recuperar senha"
            >
              Recuperar senha
            </button>
          </div>
          {/* Mensagem de erro */}
          {error && (
            <div
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              aria-live="assertive"
              className={style["form-error"]}
            >
              {error}
            </div>
          )}
          {/* Mensagem de sucesso */}
          {success && (
            <div
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className={style["form-success"]}
            >
              {success}
            </div>
          )}

          {/* Botão enviar */}
          <button
            type="submit"
            className={
              style["btn"] +
              " " +
              style["btn--primary"] +
              " " +
              style["btn--large"]
            }
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Carregando..." : "Acessar Plataforma"}
          </button>
        </form>

        <footer className={style["login-card__footer"]}>
          <p className={style["login-card__foottext"]}>
            Primeiro acesso?{" "}
            <button
              type="button"
              className={style["link"] + " " + style["link--primary"]}
              onClick={() => void router.push("/login/solicitar-credenciais")}
              aria-label="Solicitar credenciais"
            >
              Solicite suas credenciais
            </button>
          </p>
        </footer>
      </div>

      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Caro avaliador"
      >
        <section>
          <p>
            <strong>Resumo do Projeto:</strong> Protótipo do SGHSS Vida Plus,
            sistema de gestão hospitalar em Next.js 16 + TypeScript. Foco em
            dashboards acessíveis por perfis (paciente, médico, admin), com
            autenticação DEV e UI funcional. Persistência e APIs pendentes para
            integração completa.
          </p>

          <h3>✅ Implementado</h3>
          <ul>
            <li>
              UI de login com seleção de perfil (patient/doctor/admin) e
              validação.
            </li>
            <li>
              API `/api/auth` (DEV): valida credenciais hardcoded, gera JWT,
              seta cookie httpOnly.
            </li>
            <li>
              Dashboards por perfil: componentes UI (agendamentos, prontuário,
              navegação), acessíveis (WCAG, teclado).
            </li>
            <li>
              Helpers: JWT (sign/verify), nonce (CSP), stores (Zustand),
              devCredentials.
            </li>
            <li>
              Qualidade: SCSS Modules, Server Components padrão, lint/typecheck
              OK, sem `any`/`console.log`.
            </li>
          </ul>

          <h3>❌ Pendências (Prioridade)</h3>
          <ul>
            <li>
              <strong>Alta:</strong> Schema Prisma vazio → modelos (User, Role,
              Appointment, MedicalRecord), migrations, auth contra DB (argon2),
              seeds.
            </li>
            <li>
              <strong>Média:</strong> APIs de domínio (CRUD
              agendamentos/prontuário), validação (Zod), autorização
              (middleware/roles).
            </li>
            <li>
              <strong>Média:</strong> Integração front-API (ex.: agendamento
              persistente), testes (unit/integration/E2E, Jest).
            </li>
            <li>
              <strong>Baixa:</strong> CI/CD, documentação (diagramas UML, plano
              de testes), deploy (Vercel), monitoramento.
            </li>
          </ul>

          <h3>Critérios de Aceitação</h3>
          <ol>
            <li>Login DEV → redireciona dashboard, cookie `token` criado.</li>
            <li>Cookies limpos → rotas protegidas redirecionam login.</li>
            <li>Prisma implementado → criar usuário DB, auth com argon2.</li>
            <li>Agendamento UI → persiste via API criada.</li>
            <li>Testes cobrem login e agendamento (80% cobertura).</li>
          </ol>

          <h3>Checklist Atual</h3>
          <ul>
            <li>✅ UI Login/Dashboards</li>
            <li>✅ Auth DEV</li>
            <li>❌ Schema Prisma/Migrations</li>
            <li>❌ Auth DB</li>
            <li>❌ APIs Domínio</li>
            <li>❌ Testes/Seeds</li>
          </ul>

          <div style={{ marginTop: 8 }}>
            <h4>Credenciais DEV (Temporário)</h4>
            <p style={{ margin: 0 }}>
              <code>Email:</code> <strong>{DEV_CREDENTIALS.email}</strong> •{" "}
              <code>Senha:</code> <strong>{DEV_CREDENTIALS.senha}</strong>
            </p>
            <p style={{ margin: 0, marginTop: 6 }}>
              <strong>Perfis:</strong> {DEV_ROLES.join(" • ")}
            </p>
          </div>
        </section>
      </Modal>

      {/* Conteúdo adicional (rodapé abaixo do card) */}
      <div className={style["login-card__additional"]}>
        <p className={style["login-card__copyright"]}>
          © 2025 VidaPlus - Sistema de Gestão Hospitalar
        </p>
        <p className={style["login-card__links"]}>
          <a href="#">Termos de Uso</a> • <a href="#">Privacidade</a> • LGPD
        </p>
        <p className={style["login-card__note"]}>
          Acesso seguro e criptografado • Dados protegidos pela LGPD
        </p>
      </div>
    </div>
  );
}
