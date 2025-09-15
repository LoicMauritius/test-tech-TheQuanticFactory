"use client"

import { useState } from "react"
import styles from "@/styles/organisms/ContentArea.module.css"
import Button from "../atoms/Button"
import ItemModal from "@/components/atoms/Modal"
import type { EspaceVert, EquipementActivite, Fontaine } from "@/types/types"

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  items: T[]
  columns: Column<T>[]
}

export default function DataTable<T extends EspaceVert | EquipementActivite | Fontaine>({
  items,
  columns,
}: DataTableProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  return (
    <>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key.toString()}>{col.header}</th>
            ))}
            <th>Détails</th> {/* Colonne loupe */}
          </tr>
        </thead>
        <tbody>
          {items.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.key.toString()}>
                  {col.render ? col.render(item) : (item as any)[col.key] ?? "N/A"}
                </td>
              ))}
              <td style={{ textAlign: "center" }}>
                <Button variant="primary" onClick={() => setSelectedItem(item)}>
                  🔍
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale universelle */}
      <ItemModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem || undefined}
      />
    </>
  )
}
