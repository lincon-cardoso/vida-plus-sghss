"use client";
import style from "./styles/FormStyle.module.scss";
import { useRouter } from "next/navigation";
import { useState, useRef, type KeyboardEvent, type SubmitEvent } from "react";
import type { Role } from "./data";
import { roles } from "./data";
import dynamic from "next/dynamic";
import { getDashboardRoute, isAppRole } from "@/lib/roles";

const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });

// Componente client que controla entrada, feedback e redirecionamento do login.
export default function LoginForm() {
  // Estado local do formulario e dos retornos exibidos ao usuario.
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const errorRef = useRef<HTMLDivElement | null>(null);

  // Controle do modal de ajuda apresentado na tela de acesso.
  const [isHelpOpen, setIsHelpOpen] = useState(true);

  // Perfil selecionado para montar a experiencia e a rota de destino.
  const [role, setRole] = useState<Role["id"]>(roles[0].id);

  // Permite trocar o perfil com o teclado sem depender do mouse.
  const handleRoleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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

  // Envia as credenciais, valida a resposta da API e leva o usuario ao painel certo.
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
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
        cache: "no-store",
        credentials: "same-origin",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.message ?? "Falha na autenticação. Verifique suas credenciais.",
        );
      }

      setSuccess("Login bem-sucedido! Redirecionando...");

      const serverRole = data?.role;
      const nextRole =
        typeof serverRole === "string" && isAppRole(serverRole)
          ? serverRole
          : role;

      router.replace(getDashboardRoute(nextRole));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      errorRef.current?.focus();
    } finally {
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
        <section className={style["helpModalContent"]}>
          <p>
            <strong>Resumo do Projeto:</strong> Protótipo do SGHSS Vida Plus,
            sistema de gestão hospitalar em Next.js 16 + TypeScript. O login já
            usa autenticação no servidor, cria sessão persistida e protege as
            áreas por perfil (paciente, médico, admin).
          </p>

          <h3>✅ Implementado</h3>
          <ul>
            <li>
              UI de login com seleção de perfil (patient/doctor/admin),
              validação e redirecionamento por role.
            </li>
            <li>
              API `/api/auth`: valida credenciais no banco, gera JWT, seta
              cookie httpOnly e registra `UserSession`.
            </li>
            <li>
              Dashboards por perfil: componentes UI (agendamentos, prontuário,
              navegação), acessíveis (WCAG, teclado) e protegidos no servidor.
            </li>
            <li>
              Helpers: JWT (sign/verify), sessão, nonce (CSP) e stores
              (Zustand).
            </li>
            <li>
              Qualidade: SCSS Modules, Server Components padrão, lint/typecheck
              OK, sem `any` e sem logs no código final.
            </li>
          </ul>

          <h3>❌ Pendências (Prioridade)</h3>
          <ul>
            <li>
              <strong>Alta:</strong> expandir o schema Prisma com os domínios de
              negócio restantes (Appointment, MedicalRecord, etc.), migrations e
              seeds completas.
            </li>
            <li>
              <strong>Média:</strong> APIs de domínio (CRUD
              agendamentos/prontuário), validação (Zod) e demais fluxos de
              negócio.
            </li>
            <li>
              <strong>Média:</strong> Integração front-API persistente e testes
              (unit/integration/E2E, Jest).
            </li>
            <li>
              <strong>Baixa:</strong> CI/CD, documentação (diagramas UML, plano
              de testes), deploy (Vercel), monitoramento.
            </li>
          </ul>

          <h3>Critérios de Aceitação</h3>
          <ol>
            <li>Login → redireciona dashboard, cookie `token` criado.</li>
            <li>Cookies limpos → rotas protegidas redirecionam login.</li>
            <li>Prisma ativo → criar usuário DB, auth com argon2.</li>
            <li>Agendamento UI → persiste via API criada.</li>
            <li>Testes cobrem login e agendamento (80% cobertura).</li>
          </ol>

          <h3>Checklist Atual</h3>
          <ul>
            <li>✅ UI Login/Dashboards</li>
            <li>✅ Auth servidor</li>
            <li>⚠️ Schema Prisma/Migrations em evolução</li>
            <li>✅ Sessão e logout</li>
            <li>❌ APIs Domínio</li>
            <li>❌ Testes/Seeds</li>
          </ul>

          <div className={style["devCredentials"]}>
            <h4>Acesso DEV (Temporário)</h4>
            <p className={style["devCredentialsLine"]}>
              As credenciais de desenvolvimento são validadas no servidor e não
              são exibidas no cliente.
            </p>
            <p className={style["devCredentialsLineSecondary"]}>
              <strong>Perfis suportados:</strong> patient • doctor • admin
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
