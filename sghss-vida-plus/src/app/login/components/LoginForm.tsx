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
    <div className={style["login-card"]}>
      <div className={style["login-card__container"]}>
        <header className={style["login-card__header"]}>
          <h2 className={style["login-card__title"]}>Bem-vindo de volta</h2>
          <p className={style["login-card__subtitle"]}>
            Entre com suas credenciais para acessar o sistema
          </p>
        </header>

        <form onSubmit={handleSubmit} className={style["login-card__form"]} >
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
                <span className={style["role-btn__label"]}>Paciente</span>
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
              <span className={style["checkbox__label"]}>Manter-me conectado</span>
            </label>

            <a href="#" className={style["link"] + " " + style["link--muted"]}>
              Recuperar senha
            </a>
          </div>

          {/* Botão enviar */}
          <button type="submit" className={style["btn"] + " " + style["btn--primary"] + " " + style["btn--large"]}>
            Acessar Plataforma
          </button>
        </form>

        <footer className={style["login-card__footer"]}>
          <p className={style["login-card__foottext"]}>
            Primeiro acesso?{" "}
            <a href="#" className={style["link"] + " " + style["link--primary"]}>
              Solicite suas credenciais
            </a>
          </p>
        </footer>
      </div>

      {/* Conteúdo adicional (rodapé abaixo do card) — apenas estrutura TSX conforme solicitado */}
      <div className={style["login-card__additional"]}>
        <p className={style["login-card__copyright"]}>© 2024 VidaPlus - Sistema de Gestão Hospitalar</p>
        <p className={style["login-card__links"]}>
          <a href="#">Termos de Uso</a> • <a href="#">Privacidade</a> • LGPD
        </p>
        <p className={style["login-card__note"]}>Acesso seguro e criptografado • Dados protegidos pela LGPD</p>
      </div>
    </div>
  );
}
