// ===== TYPES =====
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  city: string;
  sport: string;
  image: string;
  description: string;
  categories: Category[];
  kits: Kit[];
  lots: Lot[];
  totalRegistrations: number;
  maxCapacity: number;
  status: "open" | "closed" | "upcoming";
  organizerId: number;
}

export interface Category {
  id: number;
  name: string;
  distance: string;
  price: number;
}

export interface Kit {
  id: number;
  name: string;
  description: string;
  price: number;
  items: string[];
}

export interface Lot {
  id: number;
  name: string;
  deadline: string;
  discount: number;
  active: boolean;
}

export interface Athlete {
  id: number;
  name: string;
  email: string;
  city: string;
  bibNumber: string;
  eventsParticipated: number;
  totalPhotos: number;
  results: Result[];
}

export interface Result {
  eventId: number;
  eventName: string;
  category: string;
  position: number;
  time: string;
  date: string;
}

export interface Photo {
  id: number;
  eventId: number;
  eventName: string;
  photographerId: number;
  photographerName: string;
  image: string;
  bibNumber: string;
  athleteName: string;
  price: number;
  purchased: boolean;
  detectedByOCR: boolean;
  detectedByFacial: boolean;
  uploadDate: string;
}

export interface Photographer {
  id: number;
  name: string;
  email: string;
  totalPhotos: number;
  totalSales: number;
  revenue: number;
  events: number;
}

export interface Registration {
  id: number;
  athleteId: number;
  athleteName: string;
  eventId: number;
  eventName: string;
  category: string;
  kit: string;
  status: "confirmed" | "pending" | "cancelled";
  paymentMethod: string;
  amount: number;
  date: string;
  bibNumber: string;
}

export interface Organizer {
  id: number;
  name: string;
  email: string;
  totalEvents: number;
  totalRegistrations: number;
  revenue: number;
}

// ===== MOCK DATA =====
export const events: Event[] = [
  {
    id: 1,
    title: "Maratona de Sao Paulo 2026",
    date: "2026-05-15",
    location: "Parque Ibirapuera",
    city: "Sao Paulo, SP",
    sport: "Corrida",
    image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&h=400&fit=crop",
    description: "A maior maratona do Brasil com percurso pelas principais avenidas de Sao Paulo. Categorias para todos os niveis.",
    categories: [
      { id: 1, name: "Maratona 42K", distance: "42.195 km", price: 250 },
      { id: 2, name: "Meia Maratona 21K", distance: "21.097 km", price: 180 },
      { id: 3, name: "Corrida 10K", distance: "10 km", price: 120 },
      { id: 4, name: "Caminhada 5K", distance: "5 km", price: 80 },
    ],
    kits: [
      { id: 1, name: "Kit Basico", description: "Camiseta + Numero de peito", price: 0, items: ["Camiseta oficial", "Numero de peito", "Sacola"] },
      { id: 2, name: "Kit Premium", description: "Camiseta + Viseira + Mochila", price: 75, items: ["Camiseta oficial", "Viseira", "Mochila esportiva", "Garrafa", "Numero de peito"] },
      { id: 3, name: "Kit VIP", description: "Tudo incluso + Area VIP", price: 150, items: ["Camiseta oficial", "Jaqueta", "Mochila premium", "Garrafa termica", "Area VIP pos-prova", "Massagem", "Numero de peito"] },
    ],
    lots: [
      { id: 1, name: "1o Lote", deadline: "2026-02-28", discount: 20, active: false },
      { id: 2, name: "2o Lote", deadline: "2026-04-15", discount: 10, active: true },
      { id: 3, name: "3o Lote", deadline: "2026-05-10", discount: 0, active: false },
    ],
    totalRegistrations: 8542,
    maxCapacity: 15000,
    status: "open",
    organizerId: 1,
  },
  {
    id: 2,
    title: "Triathlon do Rio 2026",
    date: "2026-06-20",
    location: "Praia de Copacabana",
    city: "Rio de Janeiro, RJ",
    sport: "Triathlon",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=400&fit=crop",
    description: "Triathlon olimpico com partida na iconica Praia de Copacabana. Natacao, ciclismo e corrida.",
    categories: [
      { id: 5, name: "Sprint", distance: "750m/20km/5km", price: 320 },
      { id: 6, name: "Olimpico", distance: "1.5km/40km/10km", price: 450 },
    ],
    kits: [
      { id: 4, name: "Kit Atleta", description: "Regata + Numero", price: 0, items: ["Regata oficial", "Numero de peito", "Touca natacao"] },
      { id: 5, name: "Kit Competidor", description: "Completo", price: 100, items: ["Regata oficial", "Viseira", "Mochila", "Touca natacao", "Numero de peito"] },
    ],
    lots: [
      { id: 4, name: "Early Bird", deadline: "2026-03-30", discount: 15, active: true },
      { id: 5, name: "Regular", deadline: "2026-06-10", discount: 0, active: false },
    ],
    totalRegistrations: 2340,
    maxCapacity: 5000,
    status: "open",
    organizerId: 1,
  },
  {
    id: 3,
    title: "Volta Ciclistica de Minas 2026",
    date: "2026-07-10",
    location: "Praca da Liberdade",
    city: "Belo Horizonte, MG",
    sport: "Ciclismo",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=400&fit=crop",
    description: "Desafio ciclistico pelas montanhas de Minas Gerais. Percursos de diferentes dificuldades.",
    categories: [
      { id: 7, name: "Gran Fondo", distance: "120 km", price: 280 },
      { id: 8, name: "Medio Fondo", distance: "60 km", price: 200 },
      { id: 9, name: "Passeio", distance: "30 km", price: 100 },
    ],
    kits: [
      { id: 6, name: "Kit Ciclista", description: "Jersey + Numero", price: 0, items: ["Jersey oficial", "Numero de quadro", "Adesivo capacete"] },
    ],
    lots: [
      { id: 6, name: "Pre-venda", deadline: "2026-05-30", discount: 20, active: true },
    ],
    totalRegistrations: 1890,
    maxCapacity: 3000,
    status: "open",
    organizerId: 2,
  },
  {
    id: 4,
    title: "Travessia Salvador 2026",
    date: "2026-08-05",
    location: "Porto da Barra",
    city: "Salvador, BA",
    sport: "Natacao",
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=400&fit=crop",
    description: "Prova de aguas abertas na Baia de Todos os Santos. Paisagem espetacular e aguas cristalinas.",
    categories: [
      { id: 10, name: "Travessia 3K", distance: "3 km", price: 200 },
      { id: 11, name: "Travessia 1.5K", distance: "1.5 km", price: 150 },
    ],
    kits: [
      { id: 7, name: "Kit Nadador", description: "Touca + Numero", price: 0, items: ["Touca oficial", "Numero de braco", "Sacola impermeavel"] },
    ],
    lots: [
      { id: 7, name: "Unico", deadline: "2026-07-25", discount: 0, active: true },
    ],
    totalRegistrations: 780,
    maxCapacity: 1500,
    status: "upcoming",
    organizerId: 2,
  },
  {
    id: 5,
    title: "Trail Run Serra da Mantiqueira",
    date: "2026-09-12",
    location: "Campos do Jordao",
    city: "Campos do Jordao, SP",
    sport: "Trail Run",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    description: "Corrida de trilha pelas montanhas da Serra da Mantiqueira. Desafio em meio a natureza.",
    categories: [
      { id: 12, name: "Ultra 50K", distance: "50 km", price: 350 },
      { id: 13, name: "Trail 25K", distance: "25 km", price: 220 },
      { id: 14, name: "Mini Trail 10K", distance: "10 km", price: 140 },
    ],
    kits: [
      { id: 8, name: "Kit Trail", description: "Camiseta + Buff", price: 0, items: ["Camiseta tecnica", "Buff", "Numero de peito"] },
      { id: 9, name: "Kit Adventure", description: "Completo", price: 90, items: ["Camiseta tecnica", "Buff", "Mochila de hidratacao", "Medalha finisher", "Numero de peito"] },
    ],
    lots: [
      { id: 8, name: "1o Lote", deadline: "2026-06-30", discount: 15, active: true },
    ],
    totalRegistrations: 1200,
    maxCapacity: 2000,
    status: "upcoming",
    organizerId: 1,
  },
  {
    id: 6,
    title: "Night Run Brasilia 2026",
    date: "2026-04-20",
    location: "Esplanada dos Ministerios",
    city: "Brasilia, DF",
    sport: "Corrida",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=400&fit=crop",
    description: "Corrida noturna pelos monumentos iluminados de Brasilia. Experiencia unica.",
    categories: [
      { id: 15, name: "Night 10K", distance: "10 km", price: 130 },
      { id: 16, name: "Night 5K", distance: "5 km", price: 90 },
    ],
    kits: [
      { id: 10, name: "Kit Neon", description: "Camiseta neon + LED", price: 0, items: ["Camiseta neon", "Pulseira LED", "Numero de peito"] },
    ],
    lots: [
      { id: 9, name: "Promocional", deadline: "2026-04-10", discount: 10, active: false },
    ],
    totalRegistrations: 4200,
    maxCapacity: 5000,
    status: "closed",
    organizerId: 3,
  },
];

export const athletes: Athlete[] = [
  {
    id: 1, name: "Lucas Oliveira", email: "lucas@email.com", city: "Sao Paulo, SP",
    bibNumber: "1042", eventsParticipated: 12, totalPhotos: 48,
    results: [
      { eventId: 1, eventName: "Maratona de Sao Paulo 2025", category: "Meia Maratona 21K", position: 23, time: "01:32:45", date: "2025-05-15" },
      { eventId: 6, eventName: "Night Run Brasilia 2025", category: "Night 10K", position: 8, time: "00:42:18", date: "2025-04-20" },
    ],
  },
  {
    id: 2, name: "Ana Beatriz Santos", email: "ana@email.com", city: "Rio de Janeiro, RJ",
    bibNumber: "2187", eventsParticipated: 8, totalPhotos: 32,
    results: [
      { eventId: 2, eventName: "Triathlon do Rio 2025", category: "Sprint", position: 5, time: "01:15:30", date: "2025-06-20" },
    ],
  },
  {
    id: 3, name: "Pedro Henrique Costa", email: "pedro@email.com", city: "Belo Horizonte, MG",
    bibNumber: "3045", eventsParticipated: 15, totalPhotos: 67,
    results: [
      { eventId: 3, eventName: "Volta Ciclistica de Minas 2025", category: "Gran Fondo", position: 12, time: "03:45:22", date: "2025-07-10" },
    ],
  },
  {
    id: 4, name: "Mariana Ferreira Lima", email: "mariana@email.com", city: "Curitiba, PR",
    bibNumber: "4521", eventsParticipated: 6, totalPhotos: 24,
    results: [],
  },
  {
    id: 5, name: "Rafael Almeida", email: "rafael@email.com", city: "Salvador, BA",
    bibNumber: "5890", eventsParticipated: 20, totalPhotos: 89,
    results: [
      { eventId: 4, eventName: "Travessia Salvador 2025", category: "Travessia 3K", position: 3, time: "00:38:15", date: "2025-08-05" },
      { eventId: 5, eventName: "Trail Run Serra 2025", category: "Trail 25K", position: 18, time: "02:48:30", date: "2025-09-12" },
    ],
  },
];

export const photos: Photo[] = [
  { id: 1, eventId: 1, eventName: "Maratona SP 2026", photographerId: 1, photographerName: "Carlos Foto", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop", bibNumber: "1042", athleteName: "Lucas Oliveira", price: 35, purchased: false, detectedByOCR: true, detectedByFacial: true, uploadDate: "2026-05-15" },
  { id: 2, eventId: 1, eventName: "Maratona SP 2026", photographerId: 1, photographerName: "Carlos Foto", image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop", bibNumber: "1042", athleteName: "Lucas Oliveira", price: 35, purchased: true, detectedByOCR: true, detectedByFacial: false, uploadDate: "2026-05-15" },
  { id: 3, eventId: 1, eventName: "Maratona SP 2026", photographerId: 2, photographerName: "Marina Lens", image: "https://images.unsplash.com/photo-1461896836934-ber11b141095?w=400&h=300&fit=crop", bibNumber: "2187", athleteName: "Ana Beatriz Santos", price: 40, purchased: false, detectedByOCR: true, detectedByFacial: true, uploadDate: "2026-05-15" },
  { id: 4, eventId: 2, eventName: "Triathlon Rio 2026", photographerId: 2, photographerName: "Marina Lens", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop", bibNumber: "2187", athleteName: "Ana Beatriz Santos", price: 45, purchased: true, detectedByOCR: false, detectedByFacial: true, uploadDate: "2026-06-20" },
  { id: 5, eventId: 3, eventName: "Volta Ciclistica MG 2026", photographerId: 3, photographerName: "Felipe Sport", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop", bibNumber: "3045", athleteName: "Pedro Henrique Costa", price: 30, purchased: false, detectedByOCR: true, detectedByFacial: true, uploadDate: "2026-07-10" },
  { id: 6, eventId: 1, eventName: "Maratona SP 2026", photographerId: 1, photographerName: "Carlos Foto", image: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400&h=300&fit=crop", bibNumber: "3045", athleteName: "Pedro Henrique Costa", price: 35, purchased: false, detectedByOCR: true, detectedByFacial: false, uploadDate: "2026-05-15" },
  { id: 7, eventId: 5, eventName: "Trail Run Serra 2026", photographerId: 3, photographerName: "Felipe Sport", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop", bibNumber: "5890", athleteName: "Rafael Almeida", price: 40, purchased: true, detectedByOCR: true, detectedByFacial: true, uploadDate: "2026-09-12" },
  { id: 8, eventId: 2, eventName: "Triathlon Rio 2026", photographerId: 2, photographerName: "Marina Lens", image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop", bibNumber: "5890", athleteName: "Rafael Almeida", price: 45, purchased: false, detectedByOCR: false, detectedByFacial: true, uploadDate: "2026-06-20" },
  { id: 9, eventId: 6, eventName: "Night Run Brasilia 2026", photographerId: 1, photographerName: "Carlos Foto", image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=400&h=300&fit=crop", bibNumber: "1042", athleteName: "Lucas Oliveira", price: 30, purchased: false, detectedByOCR: true, detectedByFacial: true, uploadDate: "2026-04-20" },
  { id: 10, eventId: 4, eventName: "Travessia Salvador 2026", photographerId: 3, photographerName: "Felipe Sport", image: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&h=300&fit=crop", bibNumber: "4521", athleteName: "Mariana Ferreira Lima", price: 35, purchased: false, detectedByOCR: true, detectedByFacial: false, uploadDate: "2026-08-05" },
];

export const photographers: Photographer[] = [
  { id: 1, name: "Carlos Foto", email: "carlos@foto.com", totalPhotos: 2450, totalSales: 890, revenue: 31150, events: 24 },
  { id: 2, name: "Marina Lens", email: "marina@lens.com", totalPhotos: 1820, totalSales: 650, revenue: 26000, events: 18 },
  { id: 3, name: "Felipe Sport", email: "felipe@sport.com", totalPhotos: 3100, totalSales: 1120, revenue: 39200, events: 32 },
];

export const registrations: Registration[] = [
  { id: 1, athleteId: 1, athleteName: "Lucas Oliveira", eventId: 1, eventName: "Maratona SP 2026", category: "Meia Maratona 21K", kit: "Kit Premium", status: "confirmed", paymentMethod: "Pix", amount: 255, date: "2026-03-10", bibNumber: "1042" },
  { id: 2, athleteId: 2, athleteName: "Ana Beatriz Santos", eventId: 2, eventName: "Triathlon Rio 2026", category: "Sprint", kit: "Kit Atleta", status: "confirmed", paymentMethod: "Cartao", amount: 272, date: "2026-04-05", bibNumber: "2187" },
  { id: 3, athleteId: 3, athleteName: "Pedro Henrique Costa", eventId: 3, eventName: "Volta Ciclistica MG 2026", category: "Gran Fondo", kit: "Kit Ciclista", status: "confirmed", paymentMethod: "Boleto", amount: 224, date: "2026-04-20", bibNumber: "3045" },
  { id: 4, athleteId: 4, athleteName: "Mariana Ferreira Lima", eventId: 1, eventName: "Maratona SP 2026", category: "Corrida 10K", kit: "Kit Basico", status: "pending", paymentMethod: "Pix", amount: 108, date: "2026-04-12", bibNumber: "4521" },
  { id: 5, athleteId: 5, athleteName: "Rafael Almeida", eventId: 5, eventName: "Trail Run Serra", category: "Trail 25K", kit: "Kit Adventure", status: "confirmed", paymentMethod: "Cartao", amount: 277, date: "2026-05-01", bibNumber: "5890" },
  { id: 6, athleteId: 1, athleteName: "Lucas Oliveira", eventId: 6, eventName: "Night Run Brasilia 2026", category: "Night 10K", kit: "Kit Neon", status: "confirmed", paymentMethod: "Pix", amount: 117, date: "2026-03-25", bibNumber: "1042" },
  { id: 7, athleteId: 5, athleteName: "Rafael Almeida", eventId: 4, eventName: "Travessia Salvador 2026", category: "Travessia 3K", kit: "Kit Nadador", status: "confirmed", paymentMethod: "Cartao", amount: 200, date: "2026-06-15", bibNumber: "5890" },
  { id: 8, athleteId: 2, athleteName: "Ana Beatriz Santos", eventId: 1, eventName: "Maratona SP 2026", category: "Corrida 10K", kit: "Kit VIP", status: "confirmed", paymentMethod: "Cartao", amount: 270, date: "2026-04-01", bibNumber: "2187" },
  { id: 9, athleteId: 3, athleteName: "Pedro Henrique Costa", eventId: 5, eventName: "Trail Run Serra", category: "Ultra 50K", kit: "Kit Trail", status: "pending", paymentMethod: "Boleto", amount: 297.5, date: "2026-05-08", bibNumber: "3045" },
  { id: 10, athleteId: 4, athleteName: "Mariana Ferreira Lima", eventId: 4, eventName: "Travessia Salvador 2026", category: "Travessia 1.5K", kit: "Kit Nadador", status: "cancelled", paymentMethod: "Pix", amount: 150, date: "2026-06-20", bibNumber: "4521" },
];

export const organizers: Organizer[] = [
  { id: 1, name: "Sprint Events", email: "contato@sprintevents.com", totalEvents: 12, totalRegistrations: 14082, revenue: 2850000 },
  { id: 2, name: "Brasil Outdoor", email: "info@brasiloutdoor.com", totalEvents: 8, totalRegistrations: 6750, revenue: 1420000 },
  { id: 3, name: "Night Sports", email: "contato@nightsports.com", totalEvents: 5, totalRegistrations: 9800, revenue: 980000 },
];

export const platformStats = [
  { label: "Eventos Realizados", value: "250+", description: "Em todo o Brasil" },
  { label: "Atletas Registrados", value: "85,000+", description: "Comunidade ativa" },
  { label: "Fotos Disponiveis", value: "500,000+", description: "Com identificacao automatica" },
  { label: "Fotografos", value: "120+", description: "Profissionais certificados" },
];

export const testimonials = [
  { name: "Lucas Oliveira", role: "Maratonista", avatar: "LO", text: "O SportFolio transformou minha experiencia em corridas. Consigo me inscrever, ver resultados e encontrar minhas fotos em segundos com o reconhecimento facial." },
  { name: "Sprint Events", role: "Organizador de Eventos", avatar: "SE", text: "Gerenciar inscricoes e financeiro nunca foi tao simples. O dashboard em tempo real nos da controle total sobre cada evento." },
  { name: "Marina Lens", role: "Fotografa Esportiva", avatar: "ML", text: "O sistema de OCR identifica automaticamente os atletas nas minhas fotos. Minhas vendas triplicaram desde que comecei a usar a plataforma." },
];

// ===== UTILITY FUNCTIONS =====
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("pt-BR").format(value);
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
};

export const sports = ["Corrida", "Triathlon", "Ciclismo", "Natacao", "Trail Run"];
export const cities = ["Sao Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Salvador, BA", "Campos do Jordao, SP", "Brasilia, DF", "Curitiba, PR"];
