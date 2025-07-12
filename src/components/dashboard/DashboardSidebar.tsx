// src/components/dashboard/DashboardSidebar.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  //BarChart3,
  Car,
  //Users,
  //UserCheck,
  Calendar,
  BookOpen,
  Store,
  MessageCircle,
  Gem,
  Cog,
  X,
  Bus,
  LogOut, FileEdit,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBusStation } from "@/context/Provider";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SidebarLink = ({
  href,
  icon,
  label,
  pathname,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  pathname: string;
}) => {
  const isActive =
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  const Icon = icon;
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-blue-50 hover:text-primary ${
        isActive && "bg-blue-100 text-primary"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
};

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { logout } = useBusStation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebar = useRef<any>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !sidebar.current.contains(target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const menuItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: t("dashboard.sidebar.overview"),
    },
    {
      href: "/dashboard/resources",
      icon: Car,
      label: t("dashboard.sidebar.resources"),
    },
    {
      href: "/dashboard/trip-planning",
      icon: Bus,
      label: t("dashboard.sidebar.tripPlanning"),
    },
    {
      href: "/dashboard/drafts",
      icon: FileEdit,
      label: "Brouillons",
    },
    {
      href: "/dashboard/bookings",
      icon: BookOpen,
      label: t("dashboard.sidebar.bookings"),
    },
    {
      href: "/dashboard/marketplace",
      icon: Store,
      label: t("dashboard.sidebar.agencyMarketplace"),
    },
    {
      href: "/dashboard/calendar",
      icon: Calendar,
      label: t("dashboard.sidebar.calendar"),
    },
    {
      href: "/dashboard/feedback",
      icon: MessageCircle,
      label: t("dashboard.sidebar.feedback"),
    },
  ];

  const secondaryMenuItems = [
    {
      href: "/dashboard/subscription",
      icon: Gem,
      label: t("dashboard.sidebar.subscription"),
    },
    {
      href: "/dashboard/settings",
      icon: Cog,
      label: t("dashboard.sidebar.settings"),
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-white shadow-lg duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center">
            <span className="font-bold text-xl text-white">B</span>
          </div>
          <h2 className="text-2xl font-bold text-primary">Bus Station</h2>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="block lg:hidden text-gray-600 hover:text-primary"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500">
              {t("dashboard.sidebar.menu")}
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <SidebarLink {...item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500">
              {t("dashboard.sidebar.other")}
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {secondaryMenuItems.map((item) => (
                <li key={item.href}>
                  <SidebarLink {...item} pathname={pathname} />
                </li>
              ))}
              <li>
                <button
                  onClick={logout}
                  className="group relative flex w-full items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  {t("dashboard.sidebar.logout")}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
