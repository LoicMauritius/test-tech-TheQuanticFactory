"use client"

import { useState } from "react"
import styles from "@/styles/molecules/HorairesDisplay.module.css"
import type { Horaires } from "@/types/types"

interface HorairesDisplayProps {
    horaires: Horaires
}

export default function HorairesDisplay({ horaires }: HorairesDisplayProps) {
    const [open, setOpen] = useState(false)

    const toggleModal = () => setOpen(!open)

    return (
        <div className={styles.horairesContainer}>
            <button className={styles.horairesButton} onClick={toggleModal}>
                📅 Horaires
            </button>

            {open && (
                <div className={styles.modalBackdrop} onClick={toggleModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3>Horaires</h3>
                        {Object.entries(horaires).map(([jour, value]) => (
                            <div key={jour} className={styles.horaireItem}>
                                <span className={styles.jour}>
                                    {jour.charAt(0).toUpperCase() + jour.slice(1)}:
                                </span>{" "}
                                <span className={styles.heure}>{value || "N/A"}</span>
                            </div>
                        ))}
                        <button className={styles.closeButton} onClick={toggleModal}>
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
