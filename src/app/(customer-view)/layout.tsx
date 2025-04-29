import type { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
    title: "Trip Agency App",
    description: "Powered By 4GI Students",
};

export default function CustomerLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
