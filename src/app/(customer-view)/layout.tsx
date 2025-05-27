"use client";

import "../globals.css"
import { useState } from "react"
import NavBar from "@/components/layouts/ClientNavBar";
import {ReactNodeProps} from "@/lib/types/common";
import Sidebar from "@/components/layouts/customer-sibebar/CustomerSidebar";
import Footer from "@/components/layouts/Footer";




export default function Layout({ children }: ReactNodeProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <div className="flex min-h-screen flex-col gap-4">
            <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} openAction={setIsSidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <NavBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
                        {children}
                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
