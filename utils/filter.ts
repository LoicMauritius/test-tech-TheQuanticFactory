// src/utils/filter.ts
import { EspaceVert, EquipementActivite, Fontaine } from "@/types/types"

// -----------------
// Espaces verts
// -----------------
export function filterEspacesVerts(
    espaces: EspaceVert[],
    searchTerm: string,
    selectedArrondissements: string[],
    selectedAvailability: string
): EspaceVert[] {
    return espaces.filter((e) => {
        /* ------------------------------------------ Search Filter ------------------------------------------ */
        const matchSearch = !searchTerm ||
            (e.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (e.type?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (e.adresse?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

        /* ------------------------------------------ Arrondissements Filter ------------------------------------------ */
        const arrondissementCode = e.arrondissement?.match(/750(\d{2})/)?.[1] ?? ""
        const selectedArrsPadded = selectedArrondissements.map((a) => a.padStart(2, "0"))           // Pad the arrondissement codes to ensure two-digit format
        const matchArrondissement = selectedArrsPadded.length === 0 ? true : arrondissementCode !== "" && selectedArrsPadded.includes(arrondissementCode)

        /*
        const matchAvailability =
          selectedAvailability.length === 0 ||
          (e.statutOuverture ? selectedAvailability.includes(e.statutOuverture) : false)*/
        return matchSearch && matchArrondissement
    })
}

export function filterEquipements(
    equipements: EquipementActivite[],
    searchTerm: string,
    selectedArrondissements: string[],
    selectedPrice: string,
    selectedAvailability: string
): EquipementActivite[] {
    return equipements.filter((e) => {
        /* ------------------------------------------ Search Filter ------------------------------------------ */
        const matchSearch =
            !searchTerm ||
            (e.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (e.type?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (e.adresse?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

        /* ------------------------------------------ Arrondissements Filter ------------------------------------------ */
        const arrondissementCode = e.arrondissement?.match(/750(\d{2})/)?.[1] ?? ""
        const selectedArrsPadded = selectedArrondissements.map((a) => a.padStart(2, "0"))           // Pad the arrondissement codes to ensure two-digit format
        const matchArrondissement = selectedArrsPadded.length === 0 ? true : arrondissementCode !== "" && selectedArrsPadded.includes(arrondissementCode)

        /* ------------------------------------------ Price Filter ------------------------------------------ */
        const matchPrice = !selectedPrice || (e.payant ? e.payant.toLocaleLowerCase() === selectedPrice.toLocaleLowerCase() : false)

        return matchSearch && matchArrondissement && matchPrice
    })
}

// -----------------
// Fontaines
// -----------------
export function filterFontaines(
    fontaines: Fontaine[],
    searchTerm: string,
    selectedArrondissements: string[],
    selectedAvailability: string
): Fontaine[] {
    return fontaines.filter((f) => {
        /* ------------------------------------------ Search Filter ------------------------------------------ */
        const matchSearch =
            !searchTerm ||
            (f.type_objet?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (f.modele?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (f.voie?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (f.commune?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

        /* ------------------------------------------ Arrondissements Filter ------------------------------------------ */
        const matchArrondissement = selectedArrondissements.length === 0 ? true : selectedArrondissements.some((a) => {
            const selectedNum = parseInt(a, 10) // 3 ou 13
            // Extraire le numéro dans f.commune
            // f.commune = "PARIS 13EME ARRONDISSEMENT"
            const communeNum = f.commune?.match(/(\d+)EME/)?.[1]
            return communeNum ? parseInt(communeNum, 10) === selectedNum : false 
        })

        console.log("filterFontaines - f.commune:", f.commune, "selectedArrondissements:", selectedArrondissements, "matchArrondissement:", matchArrondissement)

        const matchAvailability = selectedAvailability.length === 0 || (f.dispo?.toLocaleLowerCase() ? selectedAvailability.includes(f.dispo?.toLocaleLowerCase()) : false)

        return matchSearch && matchArrondissement && matchAvailability
    })
}
