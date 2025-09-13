"use client"

import { useEffect, useState } from "react"

interface EspaceVert {
  id: string
  nom: string | null
  type: string | null
  adresse: string | null
  arrondissement: string | null
  statutOuverture: string | null
  latitude: number | null
  longitude: number | null
}

interface EquipementActivite {
  id: string
  nom: string | null
  type: string | null
  adresse: string | null
  arrondissement: string | null
  statutOuverture: string | null
  payant: string | null
  latitude: number | null
  longitude: number | null
}

interface Fontaine {
  id: string
  type_objet: string | null
  modele: string | null
  voie: string | null
  commune: string | null
  dispo: string | null
}

interface AppData {
  espacesVerts: EspaceVert[]
  equipementsActivites: EquipementActivite[]
  fontaines: Fontaine[]
  counts: {
    espacesVerts: number
    equipementsActivites: number
    fontaines: number
  }
}

export default function HomePage() {
  const [data, setData] = useState<AppData>({
    espacesVerts: [],
    equipementsActivites: [],
    fontaines: [],
    counts: { espacesVerts: 0, equipementsActivites: 0, fontaines: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("espaces-verts")

  useEffect(() => {
    // Récupération des données depuis l'élément caché dans le layout
    const appDataElement = document.getElementById("app-data")
    if (appDataElement) {
      const appDataString = appDataElement.getAttribute("data-app-data")
      if (appDataString) {
        try {
          const parsedData = JSON.parse(appDataString)
          setData(parsedData)
        } catch (error) {
          console.error("Erreur lors du parsing des données:", error)
        }
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Données Urbaines de Paris</h1>
        <p className="text-gray-600">Visualisation des espaces verts, équipements d'activités et fontaines</p>
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 pb-2">
            <h3 className="text-sm font-medium text-gray-700">Espaces Verts</h3>
          </div>
          <div className="px-4 pb-4">
            <div className="text-2xl font-bold text-green-600">{data.counts.espacesVerts}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 pb-2">
            <h3 className="text-sm font-medium text-gray-700">Équipements d'Activités</h3>
          </div>
          <div className="px-4 pb-4">
            <div className="text-2xl font-bold text-blue-600">{data.counts.equipementsActivites}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 pb-2">
            <h3 className="text-sm font-medium text-gray-700">Fontaines</h3>
          </div>
          <div className="px-4 pb-4">
            <div className="text-2xl font-bold text-cyan-600">{data.counts.fontaines}</div>
          </div>
        </div>
      </div>

      {/* Tableaux de données */}
      <div className="w-full">
        <div className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("espaces-verts")}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "espaces-verts" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Espaces Verts
          </button>
          <button
            onClick={() => setActiveTab("equipements")}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "equipements" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Équipements
          </button>
          <button
            onClick={() => setActiveTab("fontaines")}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "fontaines" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Fontaines
          </button>
        </div>

        {activeTab === "espaces-verts" && (
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 pb-4">
              <h2 className="text-xl font-semibold">Espaces Verts</h2>
              <p className="text-gray-600 text-sm">
                Liste des espaces verts parisiens ({data.counts.espacesVerts} entrées)
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-2 text-left font-medium">Nom</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Type</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Adresse</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Arrondissement</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Statut</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Coordonnées</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.espacesVerts.slice(0, 50).map((espace) => (
                      <tr key={espace.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">{espace.nom || "N/A"}</td>
                        <td className="border border-gray-300 p-2">
                          {espace.type ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {espace.type}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">{espace.adresse || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{espace.arrondissement || "N/A"}</td>
                        <td className="border border-gray-300 p-2">
                          {espace.statutOuverture ? (
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                espace.statutOuverture === "Ouvert"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {espace.statutOuverture}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2 text-sm">
                          {espace.latitude && espace.longitude
                            ? `${espace.latitude.toFixed(4)}, ${espace.longitude.toFixed(4)}`
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.espacesVerts.length > 50 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Affichage des 50 premiers résultats sur {data.counts.espacesVerts}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "equipements" && (
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 pb-4">
              <h2 className="text-xl font-semibold">Équipements d'Activités</h2>
              <p className="text-gray-600 text-sm">
                Liste des équipements d'activités ({data.counts.equipementsActivites} entrées)
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-2 text-left font-medium">Nom</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Type</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Adresse</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Arrondissement</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Payant</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.equipementsActivites.slice(0, 50).map((equipement) => (
                      <tr key={equipement.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">{equipement.nom || "N/A"}</td>
                        <td className="border border-gray-300 p-2">
                          {equipement.type ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {equipement.type}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">{equipement.adresse || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{equipement.arrondissement || "N/A"}</td>
                        <td className="border border-gray-300 p-2">
                          {equipement.payant ? (
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                equipement.payant === "Oui" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                              }`}
                            >
                              {equipement.payant}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {equipement.statutOuverture ? (
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                equipement.statutOuverture === "Ouvert"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {equipement.statutOuverture}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.equipementsActivites.length > 50 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Affichage des 50 premiers résultats sur {data.counts.equipementsActivites}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "fontaines" && (
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 pb-4">
              <h2 className="text-xl font-semibold">Fontaines</h2>
              <p className="text-gray-600 text-sm">Liste des fontaines ({data.counts.fontaines} entrées)</p>
            </div>
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-2 text-left font-medium">Type d'objet</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Modèle</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Voie</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Commune</th>
                      <th className="border border-gray-300 p-2 text-left font-medium">Disponibilité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.fontaines.slice(0, 50).map((fontaine) => (
                      <tr key={fontaine.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">
                          {fontaine.type_objet ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {fontaine.type_objet}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">{fontaine.modele || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{fontaine.voie || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{fontaine.commune || "N/A"}</td>
                        <td className="border border-gray-300 p-2">
                          {fontaine.dispo ? (
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                fontaine.dispo === "En service"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {fontaine.dispo}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.fontaines.length > 50 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Affichage des 50 premiers résultats sur {data.counts.fontaines}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
