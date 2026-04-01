"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  CalendarIcon,
  UsersIcon,
  DollarIcon,
  ChartIcon,
  TrendUpIcon,
  ArrowRightIcon,
  FilterIcon,
  SearchIcon,
  DownloadIcon,
  MailIcon,
  ClockIcon,
  CheckIcon,
  PlusIcon,
} from "@/components/Icons";
import {
  events,
  registrations,
  organizers,
  formatCurrency,
  formatNumber,
  formatDate,
} from "@/data/mockData";

type TabKey = "overview" | "registrations" | "financial";

export default function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Organizer data: Sprint Events (id=1)
  const organizer = organizers.find((o) => o.id === 1)!;
  const organizerEvents = events.filter((e) => e.organizerId === 1);
  const organizerEventIds = organizerEvents.map((e) => e.id);
  const organizerRegistrations = registrations.filter((r) =>
    organizerEventIds.includes(r.eventId)
  );

  // KPI calculations
  const totalEvents = organizerEvents.length;
  const totalRegistrations = organizerRegistrations.length;
  const totalRevenue = organizerRegistrations.reduce((sum, r) => sum + r.amount, 0);
  const avgOccupancy =
    organizerEvents.length > 0
      ? organizerEvents.reduce(
          (sum, e) => sum + (e.totalRegistrations / e.maxCapacity) * 100,
          0
        ) / organizerEvents.length
      : 0;

  // Financial calculations
  const pendingRevenue = organizerRegistrations
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);
  const confirmedRevenue = organizerRegistrations
    .filter((r) => r.status === "confirmed")
    .reduce((sum, r) => sum + r.amount, 0);
  const cancelledRevenue = organizerRegistrations
    .filter((r) => r.status === "cancelled")
    .reduce((sum, r) => sum + r.amount, 0);

  // Payment method counts
  const pixCount = organizerRegistrations.filter(
    (r) => r.paymentMethod === "Pix"
  ).length;
  const cartaoCount = organizerRegistrations.filter(
    (r) => r.paymentMethod === "Cartao"
  ).length;
  const boletoCount = organizerRegistrations.filter(
    (r) => r.paymentMethod === "Boleto"
  ).length;

  // Revenue by event
  const revenueByEvent = organizerEvents.map((event) => {
    const eventRegs = organizerRegistrations.filter(
      (r) => r.eventId === event.id
    );
    return {
      title: event.title,
      amount: eventRegs.reduce((sum, r) => sum + r.amount, 0),
      count: eventRegs.length,
    };
  });

  // Max values for chart scaling
  const maxRevenueByEvent = Math.max(...revenueByEvent.map((e) => e.amount), 1);
  const maxRegistrationsByEvent = Math.max(
    ...organizerEvents.map((e) => e.totalRegistrations),
    1
  );

  // Filtered registrations for the table
  const filteredRegistrations = organizerRegistrations.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.athleteName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent =
      filterEvent === "all" || r.eventId === Number(filterEvent);
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const statusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <span className="badge-active">Confirmado</span>;
      case "pending":
        return <span className="badge-pending">Pendente</span>;
      case "cancelled":
        return <span className="badge-cancelled">Cancelado</span>;
      default:
        return <span className="badge-completed">{status}</span>;
    }
  };

  const eventStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <span className="badge-active">Aberto</span>;
      case "closed":
        return <span className="badge-cancelled">Encerrado</span>;
      case "upcoming":
        return <span className="badge-completed">Em Breve</span>;
      default:
        return <span className="badge-pending">{status}</span>;
    }
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "registrations", label: "Inscritos" },
    { key: "financial", label: "Financeiro" },
  ];

  return (
    <>
      <Sidebar role="organizer" />

      <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="page-title">Painel do Organizador</h1>
            <p className="page-subtitle">{organizer.name}</p>
          </div>
          <button className="gradient-btn-sm">
            <PlusIcon className="w-4 h-4" />
            Criar Evento
          </button>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Eventos
              </span>
              <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(totalEvents)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Inscritos
              </span>
              <div className="w-9 h-9 rounded-xl bg-secondary-100 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-secondary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(totalRegistrations)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Receita Total
              </span>
              <div className="w-9 h-9 rounded-xl bg-accent-100 flex items-center justify-center">
                <DollarIcon className="w-5 h-5 text-accent-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalRevenue)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Taxa de Ocupacao
              </span>
              <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center">
                <TrendUpIcon className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {avgOccupancy.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-medium transition-all duration-200 relative ${
                activeTab === tab.key
                  ? "text-primary-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Events List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Meus Eventos
              </h2>
              {organizerEvents.map((event) => {
                const occupancy =
                  (event.totalRegistrations / event.maxCapacity) * 100;
                return (
                  <div key={event.id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {formatDate(event.date)}
                          </span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      {eventStatusBadge(event.status)}
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>
                          {formatNumber(event.totalRegistrations)} /{" "}
                          {formatNumber(event.maxCapacity)} inscritos
                        </span>
                        <span>{occupancy.toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${Math.min(occupancy, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <button className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                        Gerenciar
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Registration Chart */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Inscricoes por Evento
              </h2>
              <div className="card p-5">
                <div className="space-y-4">
                  {organizerEvents.map((event) => {
                    const barWidth =
                      (event.totalRegistrations / maxRegistrationsByEvent) * 100;
                    return (
                      <div key={event.id}>
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span className="truncate max-w-[140px] font-medium">
                            {event.title.split(" ").slice(0, 3).join(" ")}
                          </span>
                          <span className="font-semibold">
                            {formatNumber(event.totalRegistrations)}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <div>
            {/* Filters */}
            <div className="card p-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar por nome do atleta..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="filter-input w-full pl-9"
                  />
                </div>
                <select
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Todos os Eventos</option>
                  {organizerEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Todos os Status</option>
                  <option value="confirmed">Confirmado</option>
                  <option value="pending">Pendente</option>
                  <option value="cancelled">Cancelado</option>
                </select>
                <button className="gradient-btn-sm">
                  <DownloadIcon className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Atleta</th>
                      <th>Evento</th>
                      <th>Categoria</th>
                      <th>Kit</th>
                      <th>Status</th>
                      <th>Pagamento</th>
                      <th>Valor</th>
                      <th>Data</th>
                      <th>Numero</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id}>
                        <td className="font-medium text-gray-900">
                          {reg.athleteName}
                        </td>
                        <td>{reg.eventName}</td>
                        <td>{reg.category}</td>
                        <td>{reg.kit}</td>
                        <td>{statusBadge(reg.status)}</td>
                        <td>{reg.paymentMethod}</td>
                        <td className="font-medium">
                          {formatCurrency(reg.amount)}
                        </td>
                        <td>{formatDate(reg.date)}</td>
                        <td>
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            {reg.bibNumber}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredRegistrations.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Nenhuma inscricao encontrada com os filtros selecionados.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === "financial" && (
          <div className="space-y-6">
            {/* Revenue Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Receita
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center">
                    <DollarIcon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Pendente
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(pendingRevenue)}
                </p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Confirmado
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-secondary-100 flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-secondary-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(confirmedRevenue)}
                </p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Cancelado
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                    <MailIcon className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(cancelledRevenue)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Event */}
              <div className="card p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Receita por Evento
                </h2>
                <div className="space-y-4">
                  {revenueByEvent.map((item, index) => {
                    const barWidth =
                      (item.amount / maxRevenueByEvent) * 100;
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span className="truncate max-w-[200px] font-medium">
                            {item.title.split(" ").slice(0, 3).join(" ")}
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method Breakdown */}
              <div className="card p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Metodos de Pagamento
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                        <DollarIcon className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Pix</p>
                        <p className="text-xs text-gray-500">Transferencia instantanea</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {pixCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                        <DollarIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Cartao</p>
                        <p className="text-xs text-gray-500">Credito ou debito</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {cartaoCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                        <DollarIcon className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Boleto</p>
                        <p className="text-xs text-gray-500">Boleto bancario</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {boletoCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
