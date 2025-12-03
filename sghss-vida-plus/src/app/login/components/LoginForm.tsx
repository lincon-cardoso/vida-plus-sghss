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
    <div >
      teste
    </div>
  )
}
