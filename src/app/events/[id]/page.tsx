import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { events, formatCurrency, formatDate } from "@/data/mockData";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@/components/Icons";

export async function generateStaticParams() {
  return events.map((event) => ({
    id: String(event.id),
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    notFound();
  }

  const registrationPercent = Math.round(
    (event.totalRegistrations / event.maxCapacity) * 100
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
            Inscricoes Abertas
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white">
            Em Breve
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-500 text-white">
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

      {/* Hero */}
      <section className="relative w-full h-64 md:h-96 mt-16">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container-max">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white">
                {event.sport}
              </span>
              {getStatusBadge(event.status)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-3">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
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
              <div className="flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4" />
                <span>
                  {event.location}, {event.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-10 bg-gray-50/50">
        <div className="container-max px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Info Card */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                  Sobre o Evento
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {event.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1.5">
                      <UsersIcon className="w-4 h-4 text-primary-600" />
                      <span className="font-medium">
                        {event.totalRegistrations.toLocaleString("pt-BR")} inscritos
                      </span>
                    </div>
                    <span className="text-gray-500">
                      de {event.maxCapacity.toLocaleString("pt-BR")} vagas
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${registrationPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    {registrationPercent}% das vagas preenchidas
                  </p>
                </div>
              </div>

              {/* Categories Table */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                  Categorias
                </h2>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th>Distancia</th>
                        <th>Preco</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.categories.map((category) => (
                        <tr key={category.id}>
                          <td className="font-medium text-gray-900">
                            {category.name}
                          </td>
                          <td>{category.distance}</td>
                          <td className="font-semibold text-primary-600">
                            {formatCurrency(category.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Kits Section */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                  Kits Disponiveis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.kits.map((kit) => (
                    <div
                      key={kit.id}
                      className="border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 font-poppins">
                          {kit.name}
                        </h3>
                        <span className="text-lg font-bold text-primary-600">
                          {kit.price === 0
                            ? "Incluso"
                            : formatCurrency(kit.price)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {kit.description}
                      </p>
                      <ul className="space-y-1.5">
                        {kit.items.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lots Section */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                  Lotes de Inscricao
                </h2>
                <div className="space-y-3">
                  {event.lots.map((lot) => (
                    <div
                      key={lot.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${
                        lot.active
                          ? "border-primary-300 bg-primary-50/50"
                          : "border-gray-200 bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              {lot.name}
                            </h3>
                            {lot.active && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Ativo
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                            <ClockIcon className="w-3.5 h-3.5" />
                            <span>Ate {formatDate(lot.deadline)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {lot.discount > 0 ? (
                          <span className="text-lg font-bold text-green-600">
                            {lot.discount}% de desconto
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Preco integral
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 font-poppins mb-2">
                  Garanta sua vaga
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Nao perca a oportunidade de participar deste evento. As vagas
                  sao limitadas e as inscricoes podem encerrar a qualquer
                  momento.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Categorias</span>
                    <span className="font-medium text-gray-900">
                      {event.categories.length} disponiveis
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Kits</span>
                    <span className="font-medium text-gray-900">
                      {event.kits.length} opcoes
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Vagas restantes</span>
                    <span className="font-medium text-gray-900">
                      {(
                        event.maxCapacity - event.totalRegistrations
                      ).toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="gradient-btn w-full justify-center text-center"
                >
                  Inscreva-se Agora
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Ao se inscrever, voce concorda com os termos e condicoes do
                  evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
