"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import {
  CameraIcon,
  DollarIcon,
  TrendUpIcon,
  ChartIcon,
  UploadIcon,
  ScanIcon,
  FaceIcon,
  EyeIcon,
  CheckIcon,
  ImageIcon,
  SearchIcon,
  FilterIcon,
  ClockIcon,
} from "@/components/Icons";
import {
  photos,
  photographers,
  events,
  formatCurrency,
  formatNumber,
} from "@/data/mockData";

type Tab = "overview" | "photos" | "upload";

const photographer = photographers.find((p) => p.id === 1)!;
const photographerPhotos = photos.filter((p) => p.photographerId === 1);

const ocrCount = photographerPhotos.filter((p) => p.detectedByOCR).length;
const facialCount = photographerPhotos.filter((p) => p.detectedByFacial).length;
const totalPhotosInData = photographerPhotos.length;
const purchasedPhotos = photographerPhotos.filter((p) => p.purchased);

const monthlySalesData = [
  { month: "Jan", value: 78 },
  { month: "Fev", value: 92 },
  { month: "Mar", value: 105 },
  { month: "Abr", value: 88 },
  { month: "Mai", value: 134 },
  { month: "Jun", value: 110 },
  { month: "Jul", value: 95 },
  { month: "Ago", value: 120 },
  { month: "Set", value: 142 },
  { month: "Out", value: 98 },
  { month: "Nov", value: 115 },
  { month: "Dez", value: 130 },
];
const maxSales = Math.max(...monthlySalesData.map((d) => d.value));

const recentUploads = photographerPhotos.slice(0, 5).map((p) => ({
  id: p.id,
  image: p.image,
  bibNumber: p.bibNumber,
  status: p.detectedByOCR ? "Processado" : "Pendente",
  athleteName: p.athleteName,
  eventName: p.eventName,
}));

const uniqueEvents = Array.from(
  new Set(photographerPhotos.map((p) => p.eventName))
);

export default function PhotographerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchBib, setSearchBib] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [ocrEnabled, setOcrEnabled] = useState(true);
  const [facialEnabled, setFacialEnabled] = useState(true);
  const [uploadEvent, setUploadEvent] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("35");

  const filteredPhotos = photographerPhotos.filter((p) => {
    const matchBib = searchBib
      ? p.bibNumber.toLowerCase().includes(searchBib.toLowerCase())
      : true;
    const matchEvent = selectedEvent ? p.eventName === selectedEvent : true;
    return matchBib && matchEvent;
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Visao Geral" },
    { key: "photos", label: "Minhas Fotos" },
    { key: "upload", label: "Upload" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role="photographer" />

      <div className="page-container flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title">Area do Fotografo</h1>
          <p className="page-subtitle">Carlos Foto</p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Fotos</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(photographer.totalPhotos)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <CameraIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Fotos Vendidas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(photographer.totalSales)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                <TrendUpIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(photographer.revenue)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-sport flex items-center justify-center">
                <DollarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Eventos Cobertos</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(photographer.events)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <ChartIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-semibold rounded-t-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-gradient-primary text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* AI Detection Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <ScanIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Deteccao por OCR</h3>
                    <p className="text-xs text-gray-500">
                      Leitura automatica do numero de peito
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {ocrCount}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">
                    / {totalPhotosInData} fotos
                  </span>
                </div>
                <div className="progress-bar mt-3">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        totalPhotosInData > 0
                          ? (ocrCount / totalPhotosInData) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Taxa de deteccao:{" "}
                  {totalPhotosInData > 0
                    ? Math.round((ocrCount / totalPhotosInData) * 100)
                    : 0}
                  %
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FaceIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Reconhecimento Facial
                    </h3>
                    <p className="text-xs text-gray-500">
                      Identificacao automatica de atletas
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {facialCount}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">
                    / {totalPhotosInData} fotos
                  </span>
                </div>
                <div className="progress-bar mt-3">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        totalPhotosInData > 0
                          ? (facialCount / totalPhotosInData) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Taxa de deteccao:{" "}
                  {totalPhotosInData > 0
                    ? Math.round((facialCount / totalPhotosInData) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-6">
                Vendas Mensais
              </h3>
              <div className="space-y-3">
                {monthlySalesData.map((item) => (
                  <div key={item.month} className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-10 font-medium">
                      {item.month}
                    </span>
                    <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-lg flex items-center justify-end pr-2 transition-all duration-500"
                        style={{
                          width: `${(item.value / maxSales) * 100}%`,
                        }}
                      >
                        <span className="text-xs font-semibold text-white">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sales */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Vendas Recentes
              </h3>
              {purchasedPhotos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Nenhuma venda recente encontrada.
                </p>
              ) : (
                <div className="space-y-4">
                  {purchasedPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {photo.athleteName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {photo.eventName} - Peito #{photo.bibNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">
                          {formatCurrency(photo.price)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {photo.uploadDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="card p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar por numero de peito..."
                    value={searchBib}
                    onChange={(e) => setSearchBib(e.target.value)}
                    className="filter-input pl-9 w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FilterIcon className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Todos os Eventos</option>
                    {uniqueEvents.map((evt) => (
                      <option key={evt} value={evt}>
                        {evt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="card overflow-hidden group"
                >
                  <div className="relative h-56">
                    <Image
                      src={photo.image}
                      alt={`Foto de ${photo.athleteName}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <EyeIcon className="w-8 h-8 text-white" />
                    </div>
                    {/* Event Badge */}
                    <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {photo.eventName}
                    </span>
                    {/* Sold / Available Badge */}
                    <span
                      className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${
                        photo.purchased
                          ? "bg-green-500 text-white"
                          : "bg-white/80 text-gray-700 backdrop-blur-sm"
                      }`}
                    >
                      {photo.purchased ? "Vendida" : "Disponivel"}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {photo.athleteName}
                      </p>
                      <span className="text-sm font-bold text-primary-600">
                        {formatCurrency(photo.price)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Peito #{photo.bibNumber}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-1"
                        title="Deteccao OCR"
                      >
                        <ScanIcon
                          className={`w-4 h-4 ${
                            photo.detectedByOCR
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        <span className="text-xs text-gray-400">OCR</span>
                      </div>
                      <div
                        className="flex items-center gap-1"
                        title="Reconhecimento Facial"
                      >
                        <FaceIcon
                          className={`w-4 h-4 ${
                            photo.detectedByFacial
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        <span className="text-xs text-gray-400">Facial</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  Nenhuma foto encontrada com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="space-y-6">
            {/* Upload Zone */}
            <div className="card p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer">
                <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold mb-1">
                  Arraste fotos aqui ou clique para selecionar
                </p>
                <p className="text-xs text-gray-400">
                  Formatos suportados: JPG, PNG, WEBP. Tamanho maximo: 20MB por
                  arquivo.
                </p>
              </div>
            </div>

            {/* Upload Settings */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-6">
                Configuracoes de Upload
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Evento
                  </label>
                  <select
                    value={uploadEvent}
                    onChange={(e) => setUploadEvent(e.target.value)}
                    className="filter-select w-full"
                  >
                    <option value="">Selecione o evento</option>
                    {events.map((evt) => (
                      <option key={evt.id} value={String(evt.id)}>
                        {evt.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preco padrao (R$)
                  </label>
                  <input
                    type="number"
                    value={defaultPrice}
                    onChange={(e) => setDefaultPrice(e.target.value)}
                    className="filter-input w-full"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <ScanIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Ativar OCR automatico
                    </span>
                  </div>
                  <button
                    onClick={() => setOcrEnabled(!ocrEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      ocrEnabled ? "bg-primary-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                        ocrEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FaceIcon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Ativar reconhecimento facial
                    </span>
                  </div>
                  <button
                    onClick={() => setFacialEnabled(!facialEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      facialEnabled ? "bg-primary-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                        facialEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Uploads Recentes
              </h3>
              <div className="space-y-3">
                {recentUploads.map((upload) => (
                  <div
                    key={upload.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={upload.image}
                        alt={`Upload ${upload.bibNumber}`}
                        width={56}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {upload.athleteName} - {upload.eventName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Peito #{upload.bibNumber} detectado
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          upload.status === "Processado"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {upload.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
