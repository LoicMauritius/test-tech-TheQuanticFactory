import type { EspaceVert, EquipementActivite, Fontaine } from "@/types/types"

export interface ColdDistrictData {
  arrondissement: string // "01", "02", ..., "20"
  espacesVerts: number
  equipementsActivites: number
  fontaines: number
  total: number
}

/**
 * Prépare les données agrégées par arrondissement (01 à 20).
 */
export function fetchColdDistrictsDatas(
  espacesVerts: EspaceVert[],
  equipements: EquipementActivite[],
  fontaines: Fontaine[]
): ColdDistrictData[] {
  const results: ColdDistrictData[] = []

  for (let i = 1; i <= 20; i++) {
    const arr = i.toString().padStart(2, "0") // "1" -> "01"

    // Espaces verts -> arrondissement = "75015"
    const espacesVertsCount = espacesVerts.filter(
      (e) => e.arrondissement === `750${arr}`
    ).length

    // Équipements -> arrondissement = "75014"
    const equipementsCount = equipements.filter(
      (eq) => eq.arrondissement === `750${arr}`
    ).length

    // Fontaines -> commune = "PARIS 20EME ARRONDISSEMENT"
    const fontainesCount = fontaines.filter((f) =>
      f.commune?.toUpperCase().includes(`${parseInt(arr, 10)}EME`)
    ).length

    results.push({
      arrondissement: arr,
      espacesVerts: espacesVertsCount,
      equipementsActivites: equipementsCount,
      fontaines: fontainesCount,
      total: espacesVertsCount + equipementsCount + fontainesCount,
    })
  }

  return results
}
