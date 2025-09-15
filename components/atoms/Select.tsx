"use client"

import type React from "react"
/**
 * Select atom component
 * Basic select dropdown with consistent styling
 */
import styles from "@/styles/atoms/Select.module.css"

interface SelectOption {
    value: string
    label: string
}

interface SelectProps {
    options: SelectOption[]
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    placeholder?: string
    name?: string
    id?: string
}

export default function Select({ options, value, onChange, placeholder, name, id }: SelectProps) {
    return (
        <select value={value} onChange={onChange} name={name} id={id} className={styles.select}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
