"use client";

import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import {
  CalendarIcon,
  CameraIcon,
  TrophyIcon,
  ChartIcon,
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  CheckIcon,
} from "@/components/Icons";
import {
  athletes,
  registrations,
  photos,
  events,
  formatCurrency,
  formatDate,
} from "@/data/mockData";

const athlete = athletes.find((a) => a.id === 1)!;
const athletePhotos = photos.filter((p) => p.bibNumber === athlete.bibNumber);
const athleteRegistrations = registrations.filter(
  (r) => r.athleteId === athlete.id
);
const confirmedRegistrations = athleteRegistrations.filter(
  (r) => r.status === "confirmed"
);
const bestPosition =
  athlete.results.length > 0
    ? Math.min(...athlete.results.map((r) => r.position))
    : null;

function getMedalColor(position: number): string | null {
  if (position === 1) return "text-yellow-500";
  if (position === 2) return "text-gray-400";
  if (position === 3) return "text-amber-600";
  return null;
}

export default function AthleteDashboard() {
  const today = new Date();
  const formattedToday = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const previewPhotos = athletePhotos.slice(0, 4);

  return (
    <>
      <Sidebar role="athlete" />
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title">Bem-vindo, Lucas!</h1>
          <p className="page-subtitle capitalize">{formattedToday}</p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {athlete.eventsParticipated}
            </p>
            <p className="text-sm text-gray-500 mt-1">Eventos Participados</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                <CameraIcon className="w-5 h-5 text-secondary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {athletePhotos.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Fotos Disponiveis</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-accent-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {confirmedRegistrations.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Inscricoes Ativas</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {bestPosition !== null ? `${bestPosition}o lugar` : "--"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Melhores Resultados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Events */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Proximos Eventos
              </h2>
              <Link
                href="/dashboard/athlete/events"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                Ver todos
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {confirmedRegistrations.map((reg) => {
                const event = events.find((e) => e.id === reg.eventId);
                return (
                  <div
                    key={reg.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {reg.eventName}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {reg.category}
                        </span>
                        <span className="text-xs text-gray-300">|</span>
                        <span className="text-xs text-gray-500">
                          {reg.kit}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <ClockIcon className="w-3.5 h-3.5" />
                          {event ? formatDate(event.date) : formatDate(reg.date)}
                        </span>
                        {event && (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPinIcon className="w-3.5 h-3.5" />
                            {event.city}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="badge-active">
                        <CheckIcon className="w-3 h-3 mr-1" />
                        Confirmado
                      </span>
                    </div>
                  </div>
                );
              })}
              {confirmedRegistrations.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhuma inscricao confirmada.
                </p>
              )}
            </div>
          </div>

          {/* Recent Results */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultados Recentes
              </h2>
              <Link
                href="/dashboard/athlete/results"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                Ver todos
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {athlete.results.map((result, index) => {
                const medalColor = getMedalColor(result.position);
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        medalColor
                          ? "bg-yellow-50"
                          : "bg-gray-100"
                      }`}
                    >
                      {medalColor ? (
                        <TrophyIcon className={`w-5 h-5 ${medalColor}`} />
                      ) : (
                        <span className="text-sm font-bold text-gray-500">
                          {result.position}o
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {result.eventName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {result.category}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <TrophyIcon className="w-3.5 h-3.5" />
                          {result.position}o lugar
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <ClockIcon className="w-3.5 h-3.5" />
                          {result.time}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(result.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {athlete.results.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum resultado registrado.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* My Photos Preview */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Minhas Fotos
            </h2>
            <Link
              href="/gallery"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Ver Todas
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden border border-gray-100"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.image}
                    alt={`Foto de ${photo.athleteName} - ${photo.eventName}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {photo.purchased && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckIcon className="w-3 h-3" />
                      Comprada
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {photo.eventName}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-primary-600">
                      {formatCurrency(photo.price)}
                    </span>
                    {photo.purchased && (
                      <span className="text-xs text-green-600 font-medium">
                        Comprada
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {previewPhotos.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">
              Nenhuma foto disponivel ainda.
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            href="/events"
            className="card p-6 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
              <CalendarIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Explorar Eventos
            </h3>
            <p className="text-sm text-gray-500">
              Descubra novos eventos e inscreva-se
            </p>
            <div className="flex items-center gap-1 mt-3 text-sm text-primary-600 font-medium">
              Acessar
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/gallery"
            className="card p-6 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4 group-hover:bg-secondary-200 transition-colors">
              <CameraIcon className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Ver Fotos</h3>
            <p className="text-sm text-gray-500">
              Encontre suas fotos com reconhecimento automatico
            </p>
            <div className="flex items-center gap-1 mt-3 text-sm text-primary-600 font-medium">
              Acessar
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/dashboard/athlete/results"
            className="card p-6 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
              <ChartIcon className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Meus Resultados
            </h3>
            <p className="text-sm text-gray-500">
              Acompanhe seu desempenho e historico
            </p>
            <div className="flex items-center gap-1 mt-3 text-sm text-primary-600 font-medium">
              Acessar
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
