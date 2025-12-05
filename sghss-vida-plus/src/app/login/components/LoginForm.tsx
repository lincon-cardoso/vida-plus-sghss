"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<"patient" | "doctor" | "admin">("doctor");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // envia para api
    console.log("Enviando dados:", { email, senha, role });
  };

  return (
    <div className="login-card">
      <div className="login-card__container">
        <header className="login-card__header">
          <h2 className="login-card__title">Bem-vindo De volta</h2>
          <p className="login-card__subtitle">
            Entre com suas credenciais para acessar o sistema{" "}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="login-card__form">
          {/* seletor de perfil */}
          <div className="field field--role">
            <label className="field__label">Selecione seu perfil</label>

            <div className="role-grid">
              <button
                type="button"
                onClick={() => setRole("patient")}
                className={`role-btn role-btn--patient ${
                  role === "patient" ? "is-active" : ""
                } `}
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
                } `}
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

            {/* email */}

            <div>teste</div>
            
          </div>
        </form>
      </div>
    </div>
  );
}
