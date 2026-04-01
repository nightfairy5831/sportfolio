"use client";

import { useState } from "react";
import Link from "next/link";
import { RunnerIcon } from "@/components/Icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden px-4">
      {/* Decorative blur circles */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-secondary-500/20 rounded-full blur-3xl" />

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <RunnerIcon className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold gradient-text font-poppins">
              SportFolio
            </span>
          </div>
          <p className="text-sm text-gray-500">Gestao de Eventos &amp; Fotos</p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          <button type="submit" className="gradient-btn justify-center w-full">
            Entrar
          </button>
        </form>

        {/* Links */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <a
            href="#"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Esqueceu a senha?
          </a>
          <p className="text-sm text-gray-500">
            Nao tem conta?{" "}
            <Link
              href="/register"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
