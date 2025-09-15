import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import localFont from "next/font/local"
import { AppProvider } from "@/context/AppContext"
import { getAPIData , getPrismaData } from "@/services/fetchDatas"

/* -------------------------------------------- Import Nexa font light and heavy ----------------------------------------------- */

const nexaExtraLight = localFont({
    src: [
        {
            path: "./fonts/Nexa-ExtraLight.ttf",
            weight: "200",
            style: "normal",
        },
    ],
    variable: "--nexa-extralight",
})

const nexaHeavy = localFont({
    src: [
        {
            path: "./fonts/Nexa-Heavy.ttf",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--nexa-heavy",
})

/* -------------------------------------------- Metadata  ----------------------------------------------- */

export const metadata: Metadata = {
    title: "Urban Fresh Next",
    description: "Application de visualisation des données urbaines; Îlots de fraîcheur et fontaines à Paris. Idéal pour les journées chaudes d'été.",
}

/* -------------------------------------------- Layout principal ----------------------------------------------- */

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    //const data = await getAPIData()                //Appel de l'API pour récupérer les données
    const data = await getPrismaData()                //Appel de la base de données pour récupérer les données

    return (
        <html lang="fr">
            <body className={`${nexaExtraLight.variable} ${nexaHeavy.variable}`}>
                <AppProvider data={data}>
                    {children}
                </AppProvider>
            </body>
        </html>
    )
}