"use client"

import React, { createContext, useContext } from "react"

export type AppData = {
    espacesVerts: any[]
    equipementsActivites: any[]
    fontaines: any[]
    counts: {
        espacesVerts: number
        equipementsActivites: number
        fontaines: number
    }
}

type AppContextType = {
    data: AppData
    setData: React.Dispatch<React.SetStateAction<AppData>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ data: initialData, children }: { data: AppData; children: React.ReactNode }) {
    const [data, setData] = React.useState<AppData>(initialData)
    return <AppContext.Provider value={{ data, setData }}>{children}</AppContext.Provider>
}

export function useAppData() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppData doit être utilisé à l'intérieur de <AppProvider>")
    }
    return context
}