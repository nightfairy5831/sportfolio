"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RunnerIcon, HomeIcon, CalendarIcon, CameraIcon, ChartIcon, UsersIcon, SettingsIcon, ImageIcon, DollarIcon, UploadIcon } from "./Icons";

interface SidebarProps {
  role: "athlete" | "organizer" | "photographer";
}

const roleLinks = {
  athlete: [
    { label: "Dashboard", href: "/dashboard/athlete", icon: HomeIcon },
    { label: "Meus Eventos", href: "/dashboard/athlete/events", icon: CalendarIcon },
    { label: "Minhas Fotos", href: "/gallery", icon: ImageIcon },
    { label: "Resultados", href: "/dashboard/athlete/results", icon: ChartIcon },
  ],
  organizer: [
    { label: "Dashboard", href: "/dashboard/organizer", icon: HomeIcon },
    { label: "Meus Eventos", href: "/dashboard/organizer/events", icon: CalendarIcon },
    { label: "Inscritos", href: "/dashboard/organizer/registrations", icon: UsersIcon },
    { label: "Financeiro", href: "/dashboard/organizer/financial", icon: DollarIcon },
    { label: "Comunicacoes", href: "/dashboard/organizer/communications", icon: SettingsIcon },
  ],
  photographer: [
    { label: "Dashboard", href: "/dashboard/photographer", icon: HomeIcon },
    { label: "Upload Fotos", href: "/dashboard/photographer/upload", icon: UploadIcon },
    { label: "Minhas Fotos", href: "/dashboard/photographer/photos", icon: CameraIcon },
    { label: "Vendas", href: "/dashboard/photographer/sales", icon: DollarIcon },
  ],
};

const roleLabels = {
  athlete: "Portal do Atleta",
  organizer: "Painel do Organizador",
  photographer: "Area do Fotografo",
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = roleLinks[role];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-dark z-40 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <RunnerIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">SportFolio</span>
        </Link>
        <p className="text-xs text-white/50 mt-2 pl-10">{roleLabels[role]}</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? "sidebar-link-active" : "sidebar-link"}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link href="/" className="sidebar-link text-xs">
          <HomeIcon className="w-4 h-4" />
          Voltar ao Site
        </Link>
      </div>
    </aside>
  );
}
