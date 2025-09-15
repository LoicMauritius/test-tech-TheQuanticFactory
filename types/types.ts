export interface Horaires {
  lundi: string | null
  mardi: string | null
  mercredi: string | null
  jeudi: string | null
  vendredi: string | null
  samedi: string | null
  dimanche: string | null
}

// types.ts (partagé entre backend et frontend)
export interface EspaceVert {
    id: string
    nom: string | null
    type: string | null
    adresse: string | null
    arrondissement: string | null
    statutOuverture: string | null
    ouvert24h: string | null
    caniculeOuverture: string | null
    ouvertureEstivaleNocturne: string | null
    latitude: number | null
    longitude: number | null
    surfaceVegetation: number | null
    indiceVegetation: number | null
    horaires?: Horaires 
}

export interface EquipementActivite {
    id: string
    nom: string | null
    type: string | null
    adresse: string | null
    arrondissement: string | null
    statutOuverture: string | null
    payant: string | null
    horairesPeriode: string | null
    latitude: number | null
    longitude: number | null
    horaires?: Horaires
}

export interface Fontaine {
    id: string
    type_objet: string | null
    modele: string | null
    voie: string | null
    commune: string | null
    dispo: string | null
    latitude: number | null
    longitude: number | null
}
