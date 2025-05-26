"use client";

import "../globals.css"
import { useState } from "react"
import NavBar from "@/components/layouts/ClientNavBar";
import {ReactNodeProps} from "@/lib/types/common";
import Sidebar from "@/components/layouts/CustomerSidebar";




export default function Layout({ children }: ReactNodeProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <NavBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
