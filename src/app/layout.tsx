import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import LanguageProvider from "@/context/LanguageProvider";
import {BusStationProvider} from "@/context/Provider";


export const metadata: Metadata = {
  title: "Bus Station",
  description: "Trip Agency App Powered By 4GI Students",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <LanguageProvider>
          <BusStationProvider>{children}</BusStationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
