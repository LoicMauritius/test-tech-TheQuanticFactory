"use client"

import { useState } from "react"
import styles from "@/styles/molecules/CheckboxGroup.module.css"

interface Option {
    value: string
    label: string
}

interface CheckboxGroupProps {
    title: string
    options: Option[]
    value?: string[]
    onChange?: (value: string[]) => void
    visibleCount?: number // nombre d’options visibles par défaut
}

export default function CheckboxGroup({
    title,
    options,
    value = [],
    onChange,
    visibleCount = 5,
}: CheckboxGroupProps) {
    const [showAll, setShowAll] = useState(false)

    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
        if (!onChange) return
        if (checked) {
           onChange([...value, optionValue])
        } else {
            onChange(value.filter((v) => v !== optionValue))
        }
    }

    const displayedOptions = showAll ? options : options.slice(0, visibleCount)

    return (
        <div className={styles.checkboxGroupWrapper}>
            <label className={styles.label}>{title}</label>
            <div className={styles.checkboxGroup}>
                {displayedOptions.map((option) => (
                    <div key={option.value} className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id={`${title}-${option.value}`}
                            className={styles.checkbox}
                            checked={value.includes(option.value)}
                            onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                        />
                        <label htmlFor={`${title}-${option.value}`} className={styles.checkboxLabel}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>

            {options.length > visibleCount && (
                <button type="button" className={styles.toggleButton} onClick={() => setShowAll(!showAll)} >
                    {showAll ? "Voir moins" : "Voir plus"}
                </button>
            )}
        </div>
    )
}
