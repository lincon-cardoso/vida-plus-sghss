"use client";
import style from "./styles/FormStyle.module.scss";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const errorRef = useRef<HTMLDivElement | null>(null);

  const [role, setRole] = useState<"patient" | "doctor" | "admin">("patient");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(loading) return; // previne múltiplos envios
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
          data?.message || "Falha na autenticação. Verifique suas credenciais."
        );
        errorRef.current?.focus();
        setLoading(false); // libera só no erro
        return;
      }

      setSuccess("Login bem-sucedido! Redirecionando...");          
      
      setTimeout(() => {
        router.push(`/${role}`);
      }, 5000);
      
      
      
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      errorRef.current?.focus();
      setLoading(false);
    }
  };

  return (
    <div className={style["login-card"]}>
      <div className={style["login-card__container"]}>
        <header className={style["login-card__header"]}>
          <h2 className={style["login-card__title"]}>Bem-vindo de volta</h2>
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

            <div className={style["role-grid"]}>
              <button
                type="button"
                onClick={() => setRole("patient")}
                disabled={loading}
                aria-pressed={role === "patient"}
                className={`${style["role-btn"]} ${
                  role === "patient" ? style["is-active"] : ""
                }`}
              >
                <svg
                  className={style["role-btn__icon"]}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className={style["role-btn__label"]}>Paciente</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("doctor")}
                disabled={loading}
                aria-pressed={role === "doctor"}
                className={`${style["role-btn"]} ${
                  role === "doctor" ? style["is-active"] : ""
                }`}
              >
                <svg
                  className={style["role-btn__icon"]}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4.8 10.2a4.2 4.2 0 108.4 0 4.2 4.2 0 00-8.4 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 14.4v3.6a3 3 0 003 3v0a3 3 0 003-3v-1.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 13.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  />
                </svg>
                <span className={style["role-btn__label"]}>Profissional</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                disabled={loading}
                aria-pressed={role === "admin"}
                className={`${style["role-btn"]} ${
                  role === "admin" ? style["is-active"] : ""
                }`}
              >
                <svg
                  className={style["role-btn__icon"]}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M12 2l7 4v6c0 5-3.5 9.27-7 10.5-3.5-1.23-7-5.5-7-10.5V6l7-4z" />
                </svg>
                <span className={style["role-btn__label"]}>Gestor</span>
              </button>
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
              <input type="checkbox" className={style["checkbox__input"]} />
              <span className={style["checkbox__label"]}>
                Manter-me conectado
              </span>
            </label>

            <a href="#" className={style["link"] + " " + style["link--muted"]}>
              Recuperar senha
            </a>
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
            <a
              href="#"
              className={style["link"] + " " + style["link--primary"]}
            >
              Solicite suas credenciais
            </a>
          </p>
        </footer>
      </div>

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
