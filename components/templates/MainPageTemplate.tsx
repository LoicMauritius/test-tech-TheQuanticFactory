/**
* The Main page layout template
* A template that include the header of the page, the filter sidebar and the content area with the tables and the map
* It allows to manage the state of the filters and pass the filtered data to the content area
*/
"use client"

import { useState } from "react"
import styles from "@/styles/templates/MainPageTemplate.module.css"
import Header from "@/components/organisms/Header"
import FilterSidebar from "@/components/organisms/FilterSidebar"
import ContentArea from "@/components/organisms/ContentArea"
import type { EspaceVert, EquipementActivite, Fontaine } from "@/types/types"
import { filterEspacesVerts, filterEquipements, filterFontaines } from "@/utils/filter"

// Props to fetch the datas lists in the template
interface MainPageTemplateProps {
    espacesVerts: EspaceVert[]
    equipementsActivites: EquipementActivite[]
    fontaines: Fontaine[]
}

export default function MainPageTemplate({ espacesVerts, equipementsActivites, fontaines }: MainPageTemplateProps) {
    // Initialize the filters
    const [searchTerm, setSearchTerm] = useState("")                                      // Search term state: For text-based search across all datasets 
    const [selectedPrice, setSelectedPrice] = useState("")                                // Price filter state: To filter the prices
    const [selectedArrondissements, setSelectedArrondissements] = useState<string[]>([])  // District filter state: Searching your districts
    const [selectedAvailability, setSelectedAvailability] = useState<string>("")        // Availability filter state: To filter the available freshness points/places

    /* -------------------------------------- Apply the filters to all datasets -------------------------------------- */
    const filteredEspacesVerts = filterEspacesVerts(
        espacesVerts,
        searchTerm,
        selectedArrondissements,
        selectedAvailability
    )

    const filteredEquipements = filterEquipements(
        equipementsActivites,
        searchTerm,
        selectedArrondissements,
        selectedPrice,
        selectedAvailability
    )

    const filteredFontaines = filterFontaines(
        fontaines,
        searchTerm,
        selectedArrondissements,
        selectedAvailability
    )
    
    /* ------------------------------- Main Page UI !!! With header, filters and main content card ----------------------------------- */
    return (
        <div className={styles.pageContainer}>
            <Header />
            <FilterSidebar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedPrice={selectedPrice}
                onPriceChange={setSelectedPrice}
                selectedArrondissements={selectedArrondissements}
                onArrondissementsChange={setSelectedArrondissements}
                selectedAvailability={selectedAvailability}
                onAvailabilityChange={setSelectedAvailability}
            />
            <div className={styles.mainContent}>
                <div></div>

                <ContentArea
                    espacesVerts={filteredEspacesVerts}
                    equipementsActivites={filteredEquipements}
                    fontaines={filteredFontaines}
                />
            </div>
        </div>
    )
}
