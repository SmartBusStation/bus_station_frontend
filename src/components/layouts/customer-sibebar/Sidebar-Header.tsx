import {Bus, X} from "lucide-react";
import React from "react";

export default function SidebarHeader({openAction}: {openAction: (isOpen:boolean)=>void})
{
    return (

        <div className="flex-1 relative p-6 bg-gradient-to-br from-primary via-blue-700 to-purple-700 overflow-hidden">
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
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
                        <Bus className="h-6 w-6 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Mooving.com</h1>
                        <p className="text-sm font-medium text-white/80">Travel Marketplace</p>
                    </div>
                </div>

                <button
                    className="cursor-pointer lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                    onClick={() => openAction(false)}
                >
                    <X className="h-5 w-5"/>
                </button>
            </div>
        </div>
    )
}