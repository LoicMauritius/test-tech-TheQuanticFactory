"use client"

import styles from "@/styles/molecules/FilterGroup.module.css"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"

type FilterGroupProps = {
    title: string
    type: "input" | "select"
    options?: { value: string; label: string }[]
    value?:string
    onChange?: (value: string) => void
    placeholder?: string
}

export default function FilterGroup({ title, type, options = [], value, onChange, placeholder }: FilterGroupProps) {
    return (
        <div className={styles.filterGroup}>
            <label className={styles.label}>{title}</label>

            {type === "input" && (
                <Input type="search" placeholder={placeholder} value={(value as string) ?? ""} onChange={(e) => onChange?.(e.target.value as any)} />
            )}

            {type === "select" && (
                <Select options={options} value={(value as string) ?? ""} onChange={(e) => onChange?.(e.target.value as any)} placeholder={placeholder} />
            )}
        </div>
    )
}