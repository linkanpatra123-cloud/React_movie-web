import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata = {
  title: "Movie Website",
  description: "Browse and add movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col justify-between">
        <div>
          <Suspense fallback={<div>Loading Navbar...</div>}>
            <Navbar />
          </Suspense>
          <main className="container mx-auto p-4">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}