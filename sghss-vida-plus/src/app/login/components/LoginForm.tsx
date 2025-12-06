"use client";
import style from "./styles/FormStyle.module.scss";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<"patient" | "doctor" | "admin">("doctor");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // enviar para API/Server Action — não coloque segredos no client
    console.log("enviar", { email, senha, role });
  };

  return (
    <div className="login-card">
      <div className="login-card__container">
        <header className="login-card__header">
          <h2 className="login-card__title">Bem-vindo de volta</h2>
          <p className="login-card__subtitle">
            Entre com suas credenciais para acessar o sistema
          </p>
        </header>

        <form onSubmit={handleSubmit} className="login-card__form">
          {/* Seletor de perfil */}
          <div className="field field--role">
            <label className="field__label">Selecione seu perfil</label>

            <div className="role-grid">
              <button
                type="button"
                onClick={() => setRole("patient")}
                className={`role-btn role-btn--patient ${
                  role === "patient" ? "is-active" : ""
                }`}
              >
                <svg
                  className="role-btn__icon"
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
                <span className="role-btn__label">Paciente</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("doctor")}
                className={`role-btn role-btn--doctor ${
                  role === "doctor" ? "is-active" : ""
                }`}
              >
                <svg
                  className="role-btn__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M9 12l2 2 4-4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M18.5 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>
                <span className="role-btn__label">Profissional</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`role-btn role-btn--admin ${
                  role === "admin" ? "is-active" : ""
                }`}
              >
                <svg
                  className="role-btn__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"
                  />
                </svg>
                <span className="role-btn__label">Gestor</span>
              </button>
            </div>
          </div>

          {/* E-mail */}
          <div className="field">
            <label htmlFor="email" className="field__label">
              E-mail corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.nome@vidaplus.com.br"
              className="input input--email"
              required
            />
          </div>

          {/* Senha */}
          <div className="field">
            <label htmlFor="senha" className="field__label">
              Senha de acesso
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="input input--password"
              required
            />
          </div>

          {/* Lembrar e recuperar */}
          <div className="form-row">
            <label className="checkbox">
              <input type="checkbox" className="checkbox__input" />
              <span className="checkbox__label">Manter-me conectado</span>
            </label>

            <a href="#" className="link link--muted">
              Recuperar senha
            </a>
          </div>

          {/* Botão enviar */}
          <button type="submit" className="btn btn--primary btn--large">
            Acessar Plataforma
          </button>
        </form>

        <footer className="login-card__footer">
          <p className="login-card__foottext">
            Primeiro acesso?{" "}
            <a href="#" className="link link--primary">
              Solicite suas credenciais
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
