"use client"

import React, {useState, useEffect, JSX} from "react";
import { ChevronRight, X, MapPin, Plane, Gift, History, CheckCircle, XCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";


export interface LinkItem
{
    name: string
    link?: string
    icon: React.ElementType
    subLinks?: LinkItem[]
    badge?: string
    description?: string
}


export interface TravelSidebarProps
{
    isOpen: boolean
    openAction: (isOpen: boolean) => void
}


const linkList: LinkItem[] = [
    {
        name: "Market Place",
        link: "/market-place",
        icon: MapPin ,
        description: "Discover new destinations",
        badge: "New",
    },
    {
        name: "Scheduled Trips",
        link: "/scheduled-trips",
        icon: Plane,
        description: "Your upcoming journeys",
    },
    {
        name: "Coupons",
        link: "/coupons",
        icon: Gift,
        description: "Save on your next trip",
        badge: "3",
    },
    {
        name: "History",
        icon: History,
        description: "Your travel records",
        subLinks: [
            {
                icon: CheckCircle,
                name: "Reservations",
                link: "/history/reservation",
                description: "Completed bookings",
            },
            {
                icon: XCircle,
                name: "Cancellations",
                link: "/history/cancellation",
                description: "Cancelled trips",
            },
        ],
    },
]

export default function TravelSidebar({ isOpen, openAction }: TravelSidebarProps)
{
    const activeLink = usePathname();
    const [expandedLinks, setExpandedLinks] = useState<Record<string, boolean>>({});


    useEffect(() => {
        const handleResize = () => openAction(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [openAction])


    function toggleSubMenu(linkName: string): void
    {
        setExpandedLinks((prev) => ({
            ...prev,
            [linkName]: !prev[linkName],
        }))
    }

    function isLinkActive(link?: string): boolean
    {
        if (!link) return false
        return activeLink === link || activeLink.startsWith(link + "/")
    }


    function renderLink(item: LinkItem, index: number, isSubLink = false) {
        const isActive = isLinkActive(item.link)
        const hasSubLinks = item.subLinks && item.subLinks.length > 0
        const isExpanded = expandedLinks[item.name]
        const Icon = item.icon

        const linkContent: JSX.Element = (
            <div className={`group relative flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${isSubLink ? "ml-4" : ""} ${isActive ? "bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-blue-100 hover:to-purple-50 hover:text-blue-600 hover:shadow-md hover:transform hover:scale-[1.01]"}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-30 0${isActive ? "bg-white/20 text-white" : "bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 group-hover:from-blue-100 group-hover:to-purple-100"}`}>
                    <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm truncate${isActive ? "text-white" : "text-gray-900"}`}>
                          {item.name}
                        </span>
                            {item.badge && (
                                <span className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm${isActive ? "bg-white/20 text-white" : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white"}`}>
                                    {item.badge}
                                </span>
                            )}
                    </div>
                    {item.description && (
                        <p className={`text-xs truncate mt-0.5${isActive ? "text-white/80" : "text-gray-500"}`}>
                            {item.description}
                        </p>
                    )}
                </div>

                {hasSubLinks && (
                    <div className= {`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}>
                        <ChevronRight className={`h-4 w-4${isActive ? "text-white" : "text-gray-400"}`}/>
                    </div>
                )}
            </div>
        )

        return (
            <div key={index} className="mb-1">
                {hasSubLinks ? (
                    <button className="w-full text-left" onClick={() => toggleSubMenu(item.name)}>
                        {linkContent}
                    </button>
                ) : (
                    <Link href={item.link || "#"} onClick={() => openAction(false)} className="block">
                        {linkContent}
                    </Link>
                )}

                {hasSubLinks && isExpanded && (
                    <div className="mt-2 space-y-1 overflow-hidden animate-slideDown">
                        {item.subLinks?.map((subItem, subIndex) => renderLink(subItem, subIndex, true))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            {/* Mobile Overlay */}
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => openAction(false)}
            />

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>

                    {/* Gradient Overlay for extra premium effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
                                <Plane className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Mooving</h1>
                                <p className="text-sm text-white/80">Travel Marketplace</p>
                            </div>
                        </div>

                        <button className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                            onClick={() => openAction(false)}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    <div className="mb-6">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h2>
                        {linkList.map((item, index) => renderLink(item, index))}
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl border border-blue-100 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">Active Trips</span>
                                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-full shadow-sm">2</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">Total Savings</span>
                                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-full shadow-sm">$245</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}
