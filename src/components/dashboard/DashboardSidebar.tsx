"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Car,
  Calendar,
  Store,
  MessageCircle,
  Gem,
  Cog,
  X,
  Bus,
  LogOut,
  FileEdit,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useBusStation } from "@/context/Provider"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const SidebarHeader = ({ onClose }: { onClose: () => void }) => {
  return (
      <div
          onClick={() => (window.location.href = "/dashboard")}
          className="cursor-pointer flex-1 relative p-6 bg-primary overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
              <Bus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">Bus Station</h1>
              <p className="text-sm font-semibold text-white/80">Agency Dashboard</p>
            </div>
          </div>

          <button
              className="cursor-pointer lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
              onClick={onClose}
              aria-label="Fermer la sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
  )
}

const SidebarLink = ({
                       href,
                       icon,
                       label,
                       pathname,
                       badge,
                       description,
                     }: {
  href: string
  icon: React.ElementType
  label: string
  pathname: string
  badge?: string
  description?: string
}) => {
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
  const Icon = icon

  return (
      <Link href={href} className="block cursor-pointer mb-1">
        <div
            className={`group relative flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${
                isActive
                    ? "bg-primary text-white shadow-lg transform scale-[1.02]"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-blue-100 hover:to-purple-50 hover:text-blue-600 hover:shadow-md hover:transform hover:scale-[1.01]"
            }`}
        >
          <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
                  isActive
                      ? "bg-white/20 text-white"
                      : "bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 group-hover:from-blue-100 group-hover:to-purple-100"
              }`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
            <span className={`font-semibold text-sm truncate ${isActive ? "text-white" : "text-gray-900"}`}>
              {label}
            </span>
              {badge && (
                  <span
                      className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm ${
                          isActive ? "bg-white/20 text-white" : "bg-primary text-white"
                      }`}
                  >
                {badge}
              </span>
              )}
            </div>
            {description && (
                <p className={`text-xs truncate mt-0.5 ${isActive ? "text-white/80" : "text-gray-500"}`}>{description}</p>
            )}
          </div>
        </div>
      </Link>
  )
}

const LogoutButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
  return (
      <button onClick={onClick} className="w-full block cursor-pointer mb-1">
        <div className="group relative flex items-center gap-3 rounded-xl p-3 transition-all duration-300 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:via-red-100 hover:to-red-50 hover:text-red-600 hover:shadow-md hover:transform hover:scale-[1.01]">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 bg-gradient-to-br from-red-50 to-red-50 text-red-600 group-hover:from-red-100 group-hover:to-red-100">
            <LogOut className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="font-semibold text-sm truncate text-gray-900 group-hover:text-red-600">{label}</span>
          </div>
        </div>
      </button>
  )
}

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { logout } = useBusStation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebar = useRef<any>(null)

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !sidebar.current.contains(target)) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [setSidebarOpen])

  const menuItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: t("dashboard.sidebar.overview"),
      description: "Vue d'ensemble",
    },
    {
      href: "/dashboard/resources",
      icon: Car,
      label: t("dashboard.sidebar.resources"),
      description: "Véhicules & équipements",
    },
    {
      href: "/dashboard/trip-planning",
      icon: Bus,
      label: t("dashboard.sidebar.tripPlanning"),
      description: "Planification des voyages",
    },
    {
      href: "/dashboard/drafts",
      icon: FileEdit,
      label: "Brouillons",
      description: "Voyages en cours de création",
      badge: "3",
    },
   /* {
      href: "/dashboard/bookings",
      icon: BookOpen,
      label: t("dashboard.sidebar.bookings"),
      description: "Réservations clients",
    },*/
    {
      href: "/dashboard/marketplace",
      icon: Store,
      label: t("dashboard.sidebar.agencyMarketplace"),
      description: "Place de marché",
    },
    {
      href: "/dashboard/calendar",
      icon: Calendar,
      label: t("dashboard.sidebar.calendar"),
      description: "Planning des voyages",
    },
    {
      href: "/dashboard/feedback",
      icon: MessageCircle,
      label: t("dashboard.sidebar.feedback"),
      description: "Avis & commentaires",
    },
  ]

  const secondaryMenuItems = [
    {
      href: "/dashboard/subscription",
      icon: Gem,
      label: t("dashboard.sidebar.subscription"),
      description: "Plan & facturation",
    },
    {
      href: "/dashboard/settings",
      icon: Cog,
      label: t("dashboard.sidebar.settings"),
      description: "Configuration",
    },
  ]

  return (
      <>
        {/* Overlay pour mobile */}
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
            ref={sidebar}
            className={`fixed inset-y-0 left-0 z-50 lg:w-80 w-80 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Header */}
          <SidebarHeader onClose={() => setSidebarOpen(false)} />

          {/* Navigation */}
          <div className="flex flex-col overflow-y-auto h-full">
            <nav className="p-4 space-y-2 flex-1">
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {t("dashboard.sidebar.menu")}
                </h2>
                {menuItems.map((item) => (
                    <SidebarLink key={item.href} {...item} pathname={pathname} />
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {t("dashboard.sidebar.other")}
                </h2>
                {secondaryMenuItems.map((item) => (
                    <SidebarLink key={item.href} {...item} pathname={pathname} />
                ))}

                <LogoutButton onClick={logout} label={t("dashboard.sidebar.logout")} />
              </div>
            </nav>
          </div>
        </aside>
      </>
  )
}

export default DashboardSidebar
