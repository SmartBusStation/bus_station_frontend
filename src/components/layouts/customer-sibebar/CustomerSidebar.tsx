"use client"

import React, { useEffect} from "react";
import {RenderLink} from "@/components/layouts/customer-sibebar/RenderLink";
import SidebarHeader from "@/components/layouts/customer-sibebar/Sidebar-Header";
import {LinkItem, linkList} from "@/components/layouts/customer-sibebar/clientNavLink";



export interface TravelSidebarProps
{
    isOpen: boolean
    openAction: (isOpen: boolean) => void
}


export default function TravelSidebar({ isOpen, openAction }: TravelSidebarProps)
{


    useEffect(() => {
        const handleResize = () => openAction(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [openAction])


    return (
        <>
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => openAction(false)}
            />
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 lg:w-1/5 w-80 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Header */}
                <SidebarHeader openAction={openAction}/>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    <div className="mb-6">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h2>
                        {linkList.map((link: LinkItem, index: number) => {
                            return <RenderLink linkItem={link} key={index} openAction={openAction} />
                        })}
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-12 p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl border border-blue-100 shadow-sm">
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
