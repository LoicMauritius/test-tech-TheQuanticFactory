import type { EspaceVert, EquipementActivite, Fontaine, Horaires } from "@/types/types"

const URLS = {
    fontaines: "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=100",
    espacesVerts: "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=100",
    equipementsActivites: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=100",
}

interface ApiResult<T> {
    total_count: number
    results: T[]
}

interface ApiFontaine {
    gid: string
    type_objet: string | null
    modele: string | null
    voie: string | null
    commune: string | null
    dispo: string | null
    geo_point_2d: { lat: number; lon: number } | null
}

interface ApiEspaceVert {
    gid: string
    nom: string | null
    type: string | null
    adresse: string | null
    arrondissement: string | null
    statut_ouverture: string | null
    ouvert_24h: string | null
    canicule_ouverture: string | null
    ouverture_estivale_nocturne: string | null
    lat: number | null
    lon: number | null
    surface_vegetation: number | null
    indice_vegetation: number | null
    horaires_lundi?: string | null
    horaires_mardi?: string | null
    horaires_mercredi?: string | null
    horaires_jeudi?: string | null
    horaires_vendredi?: string | null
    horaires_samedi?: string | null
    horaires_dimanche?: string | null
}

interface ApiEquipement {
    gid: string
    nom: string | null
    type: string | null
    adresse: string | null
    arrondissement: string | null
    statut_ouverture: string | null
    payant: string | null
    horaires_periode: string | null
    lat: number | null
    lon: number | null
    horaires_lundi?: string | null
    horaires_mardi?: string | null
    horaires_mercredi?: string | null
    horaires_jeudi?: string | null
    horaires_vendredi?: string | null
    horaires_samedi?: string | null
    horaires_dimanche?: string | null
}

export async function getAPIData() {
    try {
        const [resFontaines, resEspacesVerts, resEquipements] = await Promise.all([
            fetch(URLS.fontaines),
            fetch(URLS.espacesVerts),
            fetch(URLS.equipementsActivites),
        ])

        if (!resFontaines.ok || !resEspacesVerts.ok || !resEquipements.ok) {
            throw new Error("Erreur lors de la récupération des données")
        }

        const [dataFontaines, dataEspacesVerts, dataEquipements]: [ApiResult<ApiFontaine>, ApiResult<ApiEspaceVert>, ApiResult<ApiEquipement>] = await Promise.all([
            resFontaines.json(),
            resEspacesVerts.json(),
            resEquipements.json(),
        ])

        const fontaines: Fontaine[] = dataFontaines.results.map((f) => ({
            id: f.gid,
            type_objet: f.type_objet ?? null,
            modele: f.modele ?? null,
            voie: f.voie ?? null,
            commune: f.commune ?? null,
            dispo: f.dispo ?? null,
            latitude: f.geo_point_2d?.lat ?? null,
            longitude: f.geo_point_2d?.lon ?? null,
        }))

        const espacesVerts: EspaceVert[] = dataEspacesVerts.results.map((e) => {
            const horaires: Horaires = {
                lundi: e.horaires_lundi ?? null,
                mardi: e.horaires_mardi ?? null,
                mercredi: e.horaires_mercredi ?? null,
                jeudi: e.horaires_jeudi ?? null,
                vendredi: e.horaires_vendredi ?? null,
                samedi: e.horaires_samedi ?? null,
                dimanche: e.horaires_dimanche ?? null,
            }

            return {
                id: e.gid,
                nom: e.nom ?? null,
                type: e.type ?? null,
                adresse: e.adresse ?? null,
                arrondissement: e.arrondissement ?? null,
                statutOuverture: e.statut_ouverture ?? "Fermé",
                ouvert24h: e.ouvert_24h ?? null,
                caniculeOuverture: e.canicule_ouverture ?? null,
                ouvertureEstivaleNocturne: e.ouverture_estivale_nocturne ?? null,
                latitude: e.lat ?? null,
                longitude: e.lon ?? null,
                surfaceVegetation: e.surface_vegetation ?? null,
                indiceVegetation: e.indice_vegetation ?? null,
                horaires: Object.values(horaires).some((h) => h) ? horaires : undefined,
            }
        })

        const equipementsActivites: EquipementActivite[] = dataEquipements.results.map((eq) => {
            const horaires: Horaires = {
                lundi: eq.horaires_lundi ?? null,
                mardi: eq.horaires_mardi ?? null,
                mercredi: eq.horaires_mercredi ?? null,
                jeudi: eq.horaires_jeudi ?? null,
                vendredi: eq.horaires_vendredi ?? null,
                samedi: eq.horaires_samedi ?? null,
                dimanche: eq.horaires_dimanche ?? null,
            }

            return {
                id: eq.gid,
                nom: eq.nom ?? null,
                type: eq.type ?? null,
                adresse: eq.adresse ?? null,
                arrondissement: eq.arrondissement ?? null,
                statutOuverture: eq.statut_ouverture ?? "Fermé",
                payant: eq.payant ?? null,
                horairesPeriode: eq.horaires_periode ?? null,
                latitude: eq.lat ?? null,
                longitude: eq.lon ?? null,
                horaires: Object.values(horaires).some((h) => h) ? horaires : undefined,
            }
        })


        return {
            espacesVerts,
            equipementsActivites,
            fontaines,
            counts: {
                espacesVerts: dataEspacesVerts.total_count,
                equipementsActivites: dataEquipements.total_count,
                fontaines: dataFontaines.total_count,
            },
        }
    } catch (error) {
        console.error("Erreur lors du fetch des données :", error)
        return {
            espacesVerts: [] as EspaceVert[],
            equipementsActivites: [] as EquipementActivite[],
            fontaines: [] as Fontaine[],
            counts: { espacesVerts: 0, equipementsActivites: 0, fontaines: 0 },
        }
    }
}

/** 
 *  -----------------------------------------------------------------------------------------------------------
 * 
 *  Récupère les données des îlots de fraîcheur depuis la base de données 
 * 
 *  -----------------------------------------------------------------------------------------------------------
*/
import prisma from "@/libs/prisma"

function normalizeEspaceVert(raw: any): EspaceVert {
  return {
    id: raw.id,
    nom: raw.nom,
    type: raw.type,
    adresse: raw.adresse,
    arrondissement: raw.arrondissement,
    statutOuverture: raw.statutOuverture,
    ouvert24h: raw.ouvert24h,
    caniculeOuverture: raw.caniculeOuverture,
    ouvertureEstivaleNocturne: raw.ouvertureNocturne,
    latitude: raw.geo_point_2d?.lat ?? raw.latitude ?? null,
    longitude: raw.geo_point_2d?.lon ?? raw.longitude ?? null,
    surfaceVegetation: raw.surfaceVegetation ?? null,
    indiceVegetation: raw.indiceVegetation ?? null,
  }
}

function normalizeEquipement(raw: any): EquipementActivite {
  return {
    id: raw.id,
    nom: raw.nom,
    type: raw.type,
    adresse: raw.adresse,
    arrondissement: raw.arrondissement,
    statutOuverture: raw.statutOuverture,
    payant: raw.payant,
    horairesPeriode: raw.horairesPeriode,
    latitude: raw.geo_point_2d?.lat ?? raw.latitude ?? null,
    longitude: raw.geo_point_2d?.lon ?? raw.longitude ?? null,
  }
}

function normalizeFontaine(raw: any): Fontaine {
  return {
    id: raw.id,
    type_objet: raw.type_objet,
    modele: raw.modele,
    voie: raw.voie,
    commune: raw.commune,
    dispo: raw.dispo,
    latitude: raw.geo_point_2d?.lat ?? null,
    longitude: raw.geo_point_2d?.lon ?? null,
  }
}

export async function getPrismaData() {
  try {
    const [espacesVertsRaw, equipementsRaw, fontainesRaw] = await Promise.all([
      prisma.espaceVert.findMany(),
      prisma.equipementActivite.findMany(),
      prisma.fontaine.findMany(),
    ])

    const espacesVerts: EspaceVert[] = espacesVertsRaw.map((raw) => {
      const horaires: Horaires = {
        lundi: raw.horairesLundi ?? null,
        mardi: raw.horairesMardi ?? null,
        mercredi: raw.horairesMercredi ?? null,
        jeudi: raw.horairesJeudi ?? null,
        vendredi: raw.horairesVendredi ?? null,
        samedi: raw.horairesSamedi ?? null,
        dimanche: raw.horairesDimanche ?? null,
      }

      return {
        id: raw.id,
        nom: raw.nom,
        type: raw.type,
        adresse: raw.adresse,
        arrondissement: raw.arrondissement,
        statutOuverture: raw.statutOuverture ?? "Fermé",
        ouvert24h: raw.ouvert24h ?? null,
        caniculeOuverture: raw.caniculeOuverture ?? null,
        ouvertureEstivaleNocturne: raw.ouvertureNocturne ?? null,
        latitude: raw.latitude ?? null,
        longitude: raw.longitude ?? null,
        surfaceVegetation: raw.surfaceVegetation ?? null,
        indiceVegetation: raw.indiceVegetation ?? null,
        horaires: Object.values(horaires).some((h) => h) ? horaires : undefined,
      }
    })

    const equipementsActivites: EquipementActivite[] = equipementsRaw.map((raw) => {
      const horaires: Horaires = {
        lundi: raw.horairesLundi ?? null,
        mardi: raw.horairesMardi ?? null,
        mercredi: raw.horairesMercredi ?? null,
        jeudi: raw.horairesJeudi ?? null,
        vendredi: raw.horairesVendredi ?? null,
        samedi: raw.horairesSamedi ?? null,
        dimanche: raw.horairesDimanche ?? null,
      }

      return {
        id: raw.id,
        nom: raw.nom,
        type: raw.type,
        adresse: raw.adresse,
        arrondissement: raw.arrondissement,
        statutOuverture: raw.statutOuverture ?? "Fermé",
        payant: raw.payant ?? null,
        horairesPeriode: raw.horairesPeriode ?? null,
        latitude: raw.latitude ?? null,
        longitude: raw.longitude ?? null,
        horaires: Object.values(horaires).some((h) => h) ? horaires : undefined,
      }
    })

    const fontaines: Fontaine[] = fontainesRaw.map((raw) => {
        // Cast du JSON en objet avec lat/lon
        const point = raw.geo_point_2d as { lat: number; lon: number } | null;

        return {
            id: raw.id,
            type_objet: raw.type_objet ?? null,
            modele: raw.modele ?? null,
            voie: raw.voie ?? null,
            commune: raw.commune ?? null,
            dispo: raw.dispo ?? null,
            latitude: point?.lat ?? null,
            longitude: point?.lon ?? null,
        }
    })

    return {
      espacesVerts,
      equipementsActivites,
      fontaines,
      counts: {
        espacesVerts: espacesVerts.length,
        equipementsActivites: equipementsActivites.length,
        fontaines: fontaines.length,
      },
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error)
    return {
      espacesVerts: [] as EspaceVert[],
      equipementsActivites: [] as EquipementActivite[],
      fontaines: [] as Fontaine[],
      counts: { espacesVerts: 0, equipementsActivites: 0, fontaines: 0 },
    }
  }
}
