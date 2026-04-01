import Link from "next/link";
import { RunnerIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <RunnerIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SportFolio</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Plataforma completa para gestao de eventos esportivos integrada a marketplace de fotos.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link href="/events" className="text-sm text-gray-400 hover:text-white transition-colors">Eventos</Link></li>
              <li><Link href="/gallery" className="text-sm text-gray-400 hover:text-white transition-colors">Galeria de Fotos</Link></li>
              <li><Link href="/register" className="text-sm text-gray-400 hover:text-white transition-colors">Cadastre-se</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Para Voce</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard/athlete" className="text-sm text-gray-400 hover:text-white transition-colors">Portal do Atleta</Link></li>
              <li><Link href="/dashboard/organizer" className="text-sm text-gray-400 hover:text-white transition-colors">Painel do Organizador</Link></li>
              <li><Link href="/dashboard/photographer" className="text-sm text-gray-400 hover:text-white transition-colors">Area do Fotografo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">contato@sportfolio.com.br</li>
              <li className="text-sm text-gray-400">+55 (11) 99999-0000</li>
              <li className="text-sm text-gray-400">Sao Paulo, Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 SportFolio. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacidade (LGPD)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
