// app/agencies/layout.tsx
import Footer from "@/components/layouts/Footer";


export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">

        {children}
      </div>
      <Footer />
    </div>
  );
}
