import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

export async function GET() {
  try {
    // Récupération de toutes les données des trois tables
    const [espacesVerts, equipementsActivites, fontaines] = await Promise.all([
      prisma.espaceVert.findMany(),
      prisma.equipementActivite.findMany(),
      prisma.fontaine.findMany(),
    ])

    return NextResponse.json({
      espacesVerts,
      equipementsActivites,
      fontaines,
      counts: {
        espacesVerts: espacesVerts.length,
        equipementsActivites: equipementsActivites.length,
        fontaines: fontaines.length,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des données" }, { status: 500 })
  }
}