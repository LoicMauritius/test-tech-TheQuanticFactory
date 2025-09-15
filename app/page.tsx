"use client"

import { useAppData } from "@/context/AppContext"
import MainPageTemplate from "@/components/templates/MainPageTemplate"


export default function HomePage() {
    const { data } = useAppData()

    return (
        <MainPageTemplate
            espacesVerts={data.espacesVerts}
            equipementsActivites={data.equipementsActivites}
            fontaines={data.fontaines}
        />
    )
}