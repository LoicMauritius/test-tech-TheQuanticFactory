import type React from "react"
/**
* Badge atom component
* Small status indicator with different variants
*   success: Green badge for success states
*   error: Red badge for error states
*   warning: Yellow badge for warning states
*   neutral: Gray badge for neutral states
*/
import styles from "@/styles/atoms/Badge.module.css"

interface BadgeProps {
    children: React.ReactNode
    variant?: "success" | "error" | "warning" | "neutral"
}

export default function Badge({ children, variant = "neutral" }: BadgeProps) {
    return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>
}
