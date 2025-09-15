"use client"

import Button from "@/components/atoms/Button"
import styles from "@/styles/atoms/Modal.module.css"
import type { EspaceVert, EquipementActivite, Fontaine } from "@/types/types"
import HorairesDisplay from "@/components/molecules/HorairesDisplay"

type ItemType = EspaceVert | EquipementActivite | Fontaine

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  item?: ItemType
}

export default function Modal({ isOpen, onClose, item }: ModalProps) {
  if (!isOpen || !item) return null

  const title = ("nom" in item && item.nom) || ("type_objet" in item && item.type_objet) || "Détails"

  // On filtre les champs techniques et vides
  const filteredEntries = Object.entries(item).filter(([key, value]) => {
    if (key === "id") return false
    if (key === "horaires" && value) return true // On garde horaires si défini
    return value !== null && value !== undefined && value !== ""
  })

  const renderValue = (key: string, value: any) => {
    if (key === "horaires" && value) {
      return <HorairesDisplay horaires={value} />
    }
    if (Array.isArray(value)) return value.join(", ")
    return value.toString()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <Button variant="secondary" onClick={onClose}>✕</Button>
        </div>
        <div className={styles.content}>
          {filteredEntries.map(([key, value]) => (
            <div className={styles.detailRow} key={key}>
              <div className={styles.detailLabel}>{key.replace(/_/g, " ")}</div>
              <div className={styles.detailValue}>{renderValue(key, value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
