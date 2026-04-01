"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  SearchIcon,
  FilterIcon,
  CameraIcon,
  ScanIcon,
  FaceIcon,
  CartIcon,
  CheckIcon,
} from "@/components/Icons";
import { photos, events, formatCurrency } from "@/data/mockData";

export default function GalleryPage() {
  const [searchBib, setSearchBib] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [showPurchasedOnly, setShowPurchasedOnly] = useState(false);

  const uniqueEvents = Array.from(
    new Map(photos.map((p) => [p.eventId, { id: p.eventId, name: p.eventName }])).values()
  );

  const filteredPhotos = photos.filter((photo) => {
    if (searchBib && !photo.bibNumber.includes(searchBib)) return false;
    if (selectedEvent && photo.eventId !== Number(selectedEvent)) return false;
    if (showPurchasedOnly && !photo.purchased) return false;
    return true;
  });

  const ocrCount = filteredPhotos.filter((p) => p.detectedByOCR).length;
  const facialCount = filteredPhotos.filter((p) => p.detectedByFacial).length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header */}
        <section className="pt-24 pb-12 bg-gradient-hero">
          <div className="container-max px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-200">
                <CameraIcon className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">
                  Marketplace de Fotos Esportivas
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Galeria de Fotos
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Encontre suas fotos automaticamente com tecnologia de OCR para
                leitura de numeros de peito e reconhecimento facial por
                inteligencia artificial.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-30">
          <div className="container-max px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por numero de peito..."
                  value={searchBib}
                  onChange={(e) => setSearchBib(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 font-poppins"
                />
              </div>

              {/* Event Filter */}
              <div className="relative">
                <FilterIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="filter-select pl-9 pr-8 py-3 rounded-xl min-w-[200px]"
                >
                  <option value="">Todos os Eventos</option>
                  {uniqueEvents.map((evt) => (
                    <option key={evt.id} value={evt.id}>
                      {evt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purchased Toggle */}
              <button
                onClick={() => setShowPurchasedOnly(!showPurchasedOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  showPurchasedOnly
                    ? "bg-primary-50 border-primary-300 text-primary-700"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <CheckIcon className="w-4 h-4" />
                Compradas
              </button>
            </div>
          </div>
        </section>

        {/* AI Detection Badges */}
        <section className="py-6">
          <div className="container-max px-4 md:px-8">
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2.5 rounded-xl border border-blue-200">
                <ScanIcon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {ocrCount} fotos detectadas por OCR
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2.5 rounded-xl border border-purple-200">
                <FaceIcon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {facialCount} por reconhecimento facial
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-50 text-gray-600 px-4 py-2.5 rounded-xl border border-gray-200">
                <CameraIcon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {filteredPhotos.length} fotos encontradas
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="pb-16">
          <div className="container-max px-4 md:px-8">
            {filteredPhotos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="card group overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={photo.image}
                        alt={`Foto de ${photo.athleteName} - ${photo.eventName}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <SearchIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Event Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 px-2.5 py-1 rounded-full">
                          {photo.eventName}
                        </span>
                      </div>

                      {/* Bib Number Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary-600/90 backdrop-blur-sm text-xs font-bold text-white px-2.5 py-1 rounded-full">
                          #{photo.bibNumber}
                        </span>
                      </div>

                      {/* Detection Indicators */}
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {photo.detectedByOCR && (
                          <span className="w-7 h-7 rounded-full bg-blue-500/90 backdrop-blur-sm flex items-center justify-center" title="Detectado por OCR">
                            <ScanIcon className="w-3.5 h-3.5 text-white" />
                          </span>
                        )}
                        {photo.detectedByFacial && (
                          <span className="w-7 h-7 rounded-full bg-purple-500/90 backdrop-blur-sm flex items-center justify-center" title="Reconhecimento Facial">
                            <FaceIcon className="w-3.5 h-3.5 text-white" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <p className="font-medium text-gray-900 truncate">
                        {photo.athleteName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Foto por {photo.photographerName}
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-lg font-bold text-gray-900">
                          {formatCurrency(photo.price)}
                        </span>

                        {photo.purchased ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">
                            <CheckIcon className="w-3.5 h-3.5" />
                            Comprado
                          </span>
                        ) : (
                          <button className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                            <CartIcon className="w-3.5 h-3.5" />
                            Comprar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
                  <CameraIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma foto encontrada
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  Tente ajustar os filtros ou buscar por um numero de peito
                  diferente. Novas fotos sao adicionadas apos cada evento.
                </p>
                <button
                  onClick={() => {
                    setSearchBib("");
                    setSelectedEvent("");
                    setShowPurchasedOnly(false);
                  }}
                  className="mt-6 gradient-btn-sm"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
