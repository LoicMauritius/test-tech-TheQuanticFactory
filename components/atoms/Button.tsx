"use client"

import type React from "react"

/**
 * Button atom component
 * Basic button element with different variants
 *  primary: Main action button
 *  secondary: Secondary action button
 *  tab: Tab button
 */
import styles from "@/styles/atoms/Button.module.css"

interface ButtonProps {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "tab"
    active?: boolean
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}

export default function Button({children, variant = "primary", active = false, onClick, type = "button", disabled = false }: ButtonProps) {
    const getClassName = () => {
        let className = styles.button

        if (variant === "tab") {
            className += ` ${styles.tab}`
            if (active) className += ` ${styles.tabActive}`
        } else {
            className += ` ${styles[variant]}`
        }

        return className
    }

    return (
        <button type={type} className={getClassName()} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}
