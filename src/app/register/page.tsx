"use client";

import { useState } from "react";
import Link from "next/link";
import { RunnerIcon, CalendarIcon, CameraIcon } from "@/components/Icons";
import { cities } from "@/data/mockData";

const roles = [
  { key: "atleta", label: "Atleta", Icon: RunnerIcon },
  { key: "organizador", label: "Organizador", Icon: CalendarIcon },
  { key: "fotografo", label: "Fotografo", Icon: CameraIcon },
] as const;

export default function RegisterPage() {
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden px-4 py-10">
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
        </div>

        {/* Role selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 block mb-3">
            Eu sou...
          </label>
          <div className="grid grid-cols-3 gap-3">
            {roles.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  role === key
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    role === key ? "text-primary-600" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    role === key ? "text-primary-700" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Nome Completo
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

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

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="city"
              className="text-sm font-medium text-gray-700"
            >
              Cidade
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins bg-white"
            >
              <option value="">Selecione sua cidade</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="gradient-btn justify-center w-full mt-2"
          >
            Criar Conta
          </button>
        </form>

        {/* Link */}
        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-500">
            Ja tem conta?{" "}
            <Link
              href="/login"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
