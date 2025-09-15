"use client"

import type React from "react"

/**
 * Input atom component
 * Basic input field with consistent styling
 */
import styles from "@/styles/atoms/Input.module.css"

interface InputProps {
    type?: "text" | "email" | "password" | "search"
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
    id?: string
}

export default function Input({ type = "text", placeholder, value, onChange, name, id }: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            className={styles.input}
        />
    )
}
