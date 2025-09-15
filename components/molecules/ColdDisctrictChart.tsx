"use client"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import type { ColdDistrictData } from "@/utils/coldDistrict"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ColdDistrictChartProps {
    title: string
    data: ColdDistrictData[]
}

export default function ColdDistrictChart({ title, data }: ColdDistrictChartProps) {
    // Trier par numéro d’arrondissement (01 → 20)
    const sorted = [...data].sort(
        (a, b) => parseInt(a.arrondissement, 10) - parseInt(b.arrondissement, 10)
    )

    // Échelle de couleurs : rouge = peu de fraîcheur, bleu = beaucoup
    const colorScale = (value: number, max: number) => {
        const ratio = value / max
        const r = Math.round(255 * (1 - ratio)) // plus de fraîcheur → moins de rouge
        const b = Math.round(255 * ratio)       // plus de fraîcheur → plus de bleu
        return `rgb(${r}, 50, ${b})`
    }

    const maxTotal = Math.max(...sorted.map((d) => d.total))

    const chartData = {
        labels: sorted.map((d) => d.arrondissement),
        datasets: [
        {
            label: "Installations de fraîcheur",
            data: sorted.map((d) => d.total),
            backgroundColor: sorted.map((d) => colorScale(d.total, maxTotal)),
        },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
        legend: { display: false },
        title: {
            display: true,
            text: title,
        },
        },
        scales: {
            x: { title: { display: true, text: "Arrondissement" } },
            y: { title: { display: true, text: "Nombre d'installations" } },
        },
    }

    return <Bar data={chartData} options={options} />
}
