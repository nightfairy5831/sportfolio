import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  RunnerIcon,
  CameraIcon,
  CalendarIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldIcon,
  TrendUpIcon,
  UsersIcon,
  ScanIcon,
  FaceIcon,
  MapPinIcon,
} from "@/components/Icons";
import { events, platformStats, testimonials } from "@/data/mockData";

const featuredEvents = events.slice(0, 4);

const samplePhotos = [
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
];

const portals = [
  {
    icon: RunnerIcon,
    title: "Portal do Atleta",
    description:
      "Tudo o que voce precisa para acompanhar sua jornada esportiva em um so lugar.",
    features: [
      "Inscricao rapida em eventos",
      "Resultados e classificacoes",
      "Fotos identificadas automaticamente",
      "Historico completo de participacoes",
    ],
    gradient: "from-blue-500 to-blue-700",
  },
  {
    icon: CalendarIcon,
    title: "Painel do Organizador",
    description:
      "Gerencie cada detalhe dos seus eventos com ferramentas profissionais e intuitivas.",
    features: [
      "Criacao e gestao de eventos",
      "Dashboard financeiro em tempo real",
      "Controle de inscricoes e lotes",
      "Relatorios detalhados",
    ],
    gradient: "from-emerald-500 to-emerald-700",
  },
  {
    icon: CameraIcon,
    title: "Area do Fotografo",
    description:
      "Upload inteligente com identificacao automatica de atletas para maximizar suas vendas.",
    features: [
      "Upload em lote de fotos",
      "OCR automatico de numerais de peito",
      "Marketplace integrado",
      "Dashboard de vendas e receita",
    ],
    gradient: "from-orange-500 to-orange-700",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ===== SECTION 1: HERO ===== */}
      <section className="pt-24 bg-gradient-hero relative overflow-hidden">
        {/* Decorative blur circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-accent-300/10 rounded-full blur-3xl" />

        <div className="container-max section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                Gerencie{" "}
                <span className="gradient-text">Eventos Esportivos</span>.{" "}
                Encontre{" "}
                <span className="gradient-text">Suas Fotos</span>.
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                A plataforma que centraliza toda a jornada do atleta: inscricao em
                eventos, resultados em tempo real e um marketplace de fotos com
                identificacao automatica por IA.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/events" className="gradient-btn">
                  Explorar Eventos
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link href="/gallery" className="gradient-btn-outline">
                  Ver Galeria
                  <CameraIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right column */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop"
                  alt="Atleta correndo em evento esportivo"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">85K+</p>
                  <p className="text-xs text-gray-500">Athletes</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <CameraIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">500K+</p>
                  <p className="text-xs text-gray-500">Photos</p>
                </div>
              </div>

              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">250+</p>
                  <p className="text-xs text-gray-500">Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: PLATFORM STATS BAR ===== */}
      <section className="bg-gradient-dark">
        <div className="container-max px-4 md:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-white/80 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 mt-0.5">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: THREE PORTALS ===== */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Uma Plataforma,{" "}
              <span className="gradient-text">Tres Experiencias</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Cada tipo de usuario tem um portal dedicado com as ferramentas
              certas para sua necessidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.title}
                  className="card p-8 hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {portal.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {portal.description}
                  </p>
                  <ul className="space-y-3">
                    {portal.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: FEATURED EVENTS ===== */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Eventos em <span className="gradient-text">Destaque</span>
              </h2>
              <p className="mt-2 text-gray-600">
                Descubra os proximos eventos esportivos e garanta sua vaga.
              </p>
            </div>
            <Link
              href="/events"
              className="hidden md:inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Ver todos
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => {
              const registrationPercent = Math.round(
                (event.totalRegistrations / event.maxCapacity) * 100
              );
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="card overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-700 px-3 py-1 rounded-full">
                      {event.sport}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>
                        {new Date(event.date + "T00:00:00").toLocaleDateString(
                          "pt-BR",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      <span>
                        {event.location}, {event.city}
                      </span>
                    </div>

                    {/* Registration progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>
                          {event.totalRegistrations.toLocaleString("pt-BR")}{" "}
                          inscritos
                        </span>
                        <span>{registrationPercent}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${registrationPercent}%` }}
                        />
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                      Ver Evento
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/events" className="gradient-btn-outline">
              Ver todos os eventos
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PHOTO MARKETPLACE ===== */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - explanation */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Encontre Suas Fotos com{" "}
                <span className="gradient-text">IA</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Nossa tecnologia de inteligencia artificial identifica
                automaticamente os atletas nas fotos usando duas abordagens
                complementares.
              </p>

              <div className="mt-10 space-y-8">
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                    <ScanIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Leitura OCR do Numeral de Peito
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      O sistema le automaticamente o numero de peito visivel nas
                      fotos e vincula ao atleta cadastrado, facilitando a busca
                      instantanea.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0">
                    <FaceIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Reconhecimento Facial
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Mesmo quando o numero de peito nao esta visivel, a IA
                      reconhece o rosto do atleta e sugere as fotos corretas com
                      alta precisao.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Privacidade LGPD
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendUpIcon className="w-5 h-5 text-secondary-600" />
                  <span className="text-sm font-medium text-gray-700">
                    98% de precisao
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Resultados instantaneos
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - photo grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {samplePhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-md group aspect-square"
                >
                  <Image
                    src={photo}
                    alt={`Foto esportiva ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: TESTIMONIALS ===== */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              O Que Dizem Sobre o{" "}
              <span className="gradient-text">SportFolio</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Atletas, organizadores e fotografos que ja transformaram sua
              experiencia esportiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="card p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Quote SVG icon */}
                <svg
                  className="w-10 h-10 text-primary-200 mb-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                </svg>
                <p className="text-gray-700 leading-relaxed mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: CTA ===== */}
      <section className="bg-gradient-dark">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Pronto para Comecar?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Junte-se a milhares de atletas, organizadores e fotografos que ja
            usam o SportFolio para transformar sua experiencia esportiva.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 hover:shadow-lg"
            >
              Criar Conta Gratis
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/events"
              className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
            >
              Explorar Eventos
              <CalendarIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
