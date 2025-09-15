/**
 * ContentArea organism component
 * Main content display area with tabs and data visualization
 */
"use client"

import { useState } from "react"
import styles from "@/styles/organisms/ContentArea.module.css"
import TabNavigation from "@/components/molecules/TabNavigation"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import type { EspaceVert, EquipementActivite, Fontaine } from "@/types/types"
import Map from "@/components/organisms/Map"
import DataTable from "./DataTable"
import HorairesDisplay from "../molecules/HorairesDisplay"
import ColdDistrictChart from "../molecules/ColdDisctrictChart"
import { fetchColdDistrictsDatas } from "@/utils/coldDistrict"

interface ContentAreaProps {
    espacesVerts: EspaceVert[]
    equipementsActivites: EquipementActivite[]
    fontaines: Fontaine[]
}

export default function ContentArea({ espacesVerts, equipementsActivites, fontaines }: ContentAreaProps) {
    const [activeTab, setActiveTab] = useState("espaces-verts")
    const [currentPage, setCurrentPage] = useState(1)
    // Number of items per page for pagination
    const itemsPerPage = 6

    /* -------------------------------------------- Définition des onglets ----------------------------------------------- */

    const tabs = [
        { id: "espaces-verts", label: "Espaces verts publiques" },
        { id: "equipements-activites", label: "Équipements et services publiques" },
        { id: "fontaines", label: "Fontaines à eau" },
        { id: "carte", label: "Carte" },
        { id: "graphique", label: "Graphique" }
    ]

    /* -------------------------------------------- Définition des onglets ----------------------------------------------- */
    
    const getCurrentData = () => {
        let data: any[] = []
        switch (activeTab) {
            case "espaces-verts":
                data = espacesVerts
                break
            case "equipements-activites":
                data = equipementsActivites
                break
            case "fontaines":
                data = fontaines
                break
            case "carte":
                data = fontaines
                break
            default:
                data = []
        }

        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return {
            items: data.slice(startIndex, endIndex),
            totalItems: data.length,
            totalPages: Math.ceil(data.length / itemsPerPage),
        }
    }

    /* -------------------------------------------- gestion de la pagination des tableaux de dataset ----------------------------------------------- */

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId)
        setCurrentPage(1) // Reset to first page when changing tabs
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const renderPagination = () => {
        const { totalPages, totalItems } = getCurrentData()

        if (totalPages <= 1) return null

        const startItem = (currentPage - 1) * itemsPerPage + 1
        const endItem = Math.min(currentPage * itemsPerPage, totalItems)

        return (
            <div className={styles.pagination}>
                <div className={styles.paginationInfo}>
                    Affichage de {startItem} à {endItem} sur {totalItems} éléments
                </div>
                <div className={styles.paginationControls}>
                    <Button variant="secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Précédent
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                            pageNum = i + 1
                        } else if (currentPage <= 3) {
                            pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                        } else {
                            pageNum = currentPage - 2 + i
                        }

                        return (
                            <Button key={pageNum} variant={currentPage === pageNum ? "primary" : "secondary"} onClick={() => handlePageChange(pageNum)} >
                              {pageNum}
                            </Button>
                        )
                    })}

                    <Button variant="secondary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} >
                        Suivant
                    </Button>
                </div>
            </div>
        )
    }

    /* -------------------------------------------- Displayer pour les Espaces Verts ----------------------------------------------- */

    const renderEspacesVerts = () => {
        const { items, totalItems } = getCurrentData()

        if (totalItems === 0) {
            return (
                <div className={styles.emptyMessage}>
                    Pas d'espaces verts présents pour les filtres choisis
                </div>
            )
        }

        const columns = [
            { key: "nom", header: "Nom" },
            { key: "type", header: "Type"},
            { key: "adresse", header: "Adresse" },
            { key: "arrondissement", header: "Arrondissement" },
            {
                key: "horaires",
                header: "Horaires",
                render: (item: EspaceVert | EquipementActivite) =>
                    item.horaires ? <HorairesDisplay horaires={item.horaires} /> : "No Datas",
            }
        ]

        return (
            <div className={styles.tableArea}>
                <DataTable items={items as EspaceVert[]} columns={columns} />
                {renderPagination()}
                <ColdDistrictChart title="Ilôts de fraîcheur des espaces verts à Paris par arrondissement" data={fetchColdDistrictsDatas(espacesVerts, [], [])} />
            </div>
        )
    }

    /* -------------------------------------------- Displayer pour les Equipements ----------------------------------------------- */

    const renderEquipements = () => {
        const { items, totalItems } = getCurrentData()

        if (totalItems === 0) {
            return (
                <div className={styles.emptyMessage}>
                    Pas d'équipements présents pour les filtres choisis
                </div>
            )
        }

        const columns = [
            { key: "nom", header: "Nom" },
            { key: "type", header: "Type"},
            { key: "adresse", header: "Adresse" },
            { key: "arrondissement", header: "Arrondissement" },
            {
            key: "payant",
            header: "Payant",
            render: (e: EquipementActivite) =>
                e.payant && (
                <Badge variant={e.payant === "Oui" ? "error" : "success"}>
                    {e.payant === "Oui" ? "Payant" : "Gratuit"}
                </Badge>
                ),
            },
            {
                key: "horaires",
                header: "Horaires",
                render: (item: EspaceVert | EquipementActivite) =>
                    item.horaires ? <HorairesDisplay horaires={item.horaires} /> : "No Datas",
            }
        ]

        return (
            <div className={styles.tableArea}>
                <DataTable items={items as EquipementActivite[]} columns={columns} />
                {renderPagination()}
                <ColdDistrictChart title="Ilôts de fraîcheur des équipements et services publiques à Paris par arrondissement" data={fetchColdDistrictsDatas([], equipementsActivites, [])} />
            </div>
        )
    }

    /* -------------------------------------------- Displayer pour les Fontaines ----------------------------------------------- */

    const renderFontaines = () => {
        const { items, totalItems } = getCurrentData()

        if (totalItems === 0) {
            return (
                <div className={styles.emptyMessage}>
                    Pas de fontaines présentes pour les filtres choisis
                </div>
            )
        }

        const columns = [
            { key: "type_objet", header: "Type"},
            { key: "modele", header: "Modèle" },
            { key: "voie", header: "Voie" },
            { key: "commune", header: "Commune" },
            {
            key: "dispo",
            header: "Disponibilité",
            render: (f: Fontaine) =>
                f.dispo && (
                <Badge variant={f.dispo.toLocaleLowerCase() === "oui" ? "success" : "error"}>
                    {f.dispo}
                </Badge>
                ),
            }
        ]

        return (
            <div className={styles.tableArea}>
                <DataTable items={items as Fontaine[]} columns={columns} />
                {renderPagination()}
                <ColdDistrictChart title="Fontaines à eau publiques à Paris par arrondissement" data={fetchColdDistrictsDatas([], [], fontaines)} />
            </div>
        )
    }

    /* -------------------------------------------- Displayer pour les Map ----------------------------------------------- */

    const renderMap = () => {
        return (
            <div className={styles.mapArea}>
                <Map fontaines={fontaines} />
            </div>
        )
    }

    /* -------------------------------------------- Displayer pour le graphique globale ----------------------------------------------- */

    const renderCombinedChart = () => {
        return (
            <div className={styles.mapArea}>
                <ColdDistrictChart title="Ilôts de fraîcheur totaux à Paris par arrondissement" data={fetchColdDistrictsDatas(espacesVerts, equipementsActivites, fontaines)} />
            </div>
        )
    }

    /* -------------------------------------------- Content Area ----------------------------------------------- */

    const renderContent = () => {
        switch (activeTab) {
            case "espaces-verts":
                return renderEspacesVerts()
            case "equipements-activites":
                return renderEquipements()
            case "fontaines":
                return renderFontaines()
            case "carte":
                return renderMap()
            case "graphique":
                return renderCombinedChart()
            default:
                return null
        }
    }

    return (
        <main className={styles.contentArea}>
            <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
            {renderContent()}
        </main>
    )
}
