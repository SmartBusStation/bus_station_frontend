import type { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
    title: "Customer Market Place",
    description: "Powered By 4GI Students",
};

export default function CustomerLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            {children}
        </div>
    );
}
