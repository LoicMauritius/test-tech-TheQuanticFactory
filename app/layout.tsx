import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Suspense } from "react"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Données Urbaines - Espaces Verts, Équipements et Fontaines",
  description: "Application de visualisation des données urbaines",
  generator: "v0.app",
}

async function getData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api`, {
      cache: "no-store", // Pour avoir des données fraîches à chaque requête
    })

    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des données")
    }

    return res.json()
  } catch (error) {
    console.error("Erreur:", error)
    return {
      espacesVerts: [],
      equipementsActivites: [],
      fontaines: [],
      counts: { espacesVerts: 0, equipementsActivites: 0, fontaines: 0 },
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await getData()

  return (
    <html lang="fr">
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <div id="app-data" data-app-data={JSON.stringify(data)} style={{ display: "none" }} />
          {children}
        </Suspense>
      </body>
    </html>
  )
}