"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { events, sports } from "@/data/mockData";
import {
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@/components/Icons";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport =
      selectedSport === "" || event.sport === selectedSport;

    const matchesStatus =
      selectedStatus === "" || event.status === selectedStatus;

    return matchesSearch && matchesSport && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
            Aberto
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
            Em Breve
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
            Encerrado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container-max px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-poppins mb-4">
              Eventos Esportivos
            </h1>
            <p className="text-lg text-gray-600">
              Encontre os melhores eventos esportivos do Brasil. Inscreva-se,
              acompanhe resultados e viva experiencias incriveis.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container-max px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos por nome, cidade ou local..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input w-full pl-10 pr-4"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <FilterIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="filter-select w-full md:w-48 pl-9 pr-4 appearance-none"
                >
                  <option value="">Todos os Esportes</option>
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select flex-1 md:flex-none md:w-44 appearance-none"
              >
                <option value="">Todos os Status</option>
                <option value="open">Aberto</option>
                <option value="upcoming">Em Breve</option>
                <option value="closed">Encerrado</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="flex-1 py-12 bg-gray-50/50">
        <div className="container-max px-4 md:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const registrationPercent = Math.round(
                  (event.totalRegistrations / event.maxCapacity) * 100
                );

                return (
                  <div
                    key={event.id}
                    className="card overflow-hidden group hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Sport Badge - Top Left */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800">
                          {event.sport}
                        </span>
                      </div>

                      {/* Status Badge - Top Right */}
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(event.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 font-poppins mb-3 line-clamp-1">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>
                            {new Date(event.date + "T00:00:00").toLocaleDateString(
                              "pt-BR",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {event.location}, {event.city}
                          </span>
                        </div>
                      </div>

                      {/* Registration Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                          <div className="flex items-center gap-1">
                            <UsersIcon className="w-3.5 h-3.5" />
                            <span>
                              {event.totalRegistrations.toLocaleString("pt-BR")}{" "}
                              inscritos
                            </span>
                          </div>
                          <span>
                            {event.maxCapacity.toLocaleString("pt-BR")} vagas
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${registrationPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/events/${event.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group/link"
                      >
                        Ver Detalhes
                        <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2 font-poppins">
                Nenhum evento encontrado
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Tente ajustar os filtros ou buscar por outros termos. Novos
                eventos sao adicionados frequentemente.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
