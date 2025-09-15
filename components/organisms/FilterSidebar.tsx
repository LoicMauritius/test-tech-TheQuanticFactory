/**
 * FilterSidebar organism component
 * Contains all filter controls for data filtering
 */
"use client"

import styles from "@/styles/organisms/FilterSidebar.module.css"
import FilterGroup from "@/components/molecules/FilterGroup"
import Image from "next/image"
import CheckboxGroup from "../molecules/CheckboxGroup"

interface FilterSidebarProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    selectedPrice: string
    onPriceChange: (value: string) => void
    selectedArrondissements: string[]
    onArrondissementsChange: (value: string[]) => void
    selectedAvailability: string
    onAvailabilityChange: (value: string) => void
}

export default function FilterSidebar({ searchTerm, onSearchChange, selectedPrice, onPriceChange, selectedArrondissements, onArrondissementsChange, selectedAvailability, onAvailabilityChange }: FilterSidebarProps) {

    /* ------------------------------- handlers for the filters----------------------------------- */
    const handleSearchChange = (value: string) => { onSearchChange(typeof value === "string" ? value : "") }
    const handlePriceChange = (value: string) => { onPriceChange(typeof value === "string" ? value : "") }
    const handleArrondissementsChange = (value: string[]) => { onArrondissementsChange(Array.isArray(value) ? value : [])}
    const handleAvailabilityChange = (value: string) => { onAvailabilityChange(typeof value === "string" ? value : "")}

    // Generate arrondissement options (1-20)
    const arrondissementOptions = Array.from({ length: 20 }, (_, i) => ({
        value: (i + 1).toString(),
        label: `${i + 1}e arrondissement`,
    }))

    // Price options 
    const priceOptions = [
        { value: "non", label: "Gratuit" },
        { value: "oui", label: "Payant" },
    ]

    // Availability options
    const availabilityOptions = [
        { value: "oui", label: "Disponible" },
        { value: "non", label: "Non disponible" },
    ]

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <Image src="/filtre.png" alt="Filter Icon" width={24} height={24} />
                <h2 className={styles.sidebarTitle}>Filtres</h2>
            </div>

            <div className={styles.filtersContainer}>
                <FilterGroup
                    title="Recherche par nom/adresse"
                    type="input"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <FilterGroup
                    title="Prix"
                    type="select"
                    options={priceOptions}
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    placeholder="Tous les prix"
                />

                <CheckboxGroup
                    title="Arrondissements"
                    options={arrondissementOptions} // ex: [{value: "01", label: "1e arrondissement"}, ...]
                    value={selectedArrondissements}
                    onChange={handleArrondissementsChange}
                />

                <FilterGroup
                    title="Disponibilité"
                    type="select"
                    options={availabilityOptions}
                    value={selectedAvailability}
                    onChange={handleAvailabilityChange}
                    placeholder="Tous"
                />
            </div>
        </aside>
    )
}
