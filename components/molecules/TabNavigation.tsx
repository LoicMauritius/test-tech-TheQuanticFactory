"use client"

/**
 * TabNavigation molecule component
 * Navigation tabs for switching between different views
 */
import styles from "@/styles/molecules/TabNavigation.module.css"
import Button from "@/components/atoms/Button"

interface Tab {
    id: string
    label: string
}

interface TabNavigationProps {
    tabs: Tab[]
    activeTab: string
    onTabChange: (tabId: string) => void
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
    return (
        <div className={styles.tabNavigation}>
            {tabs.map((tab) => (
                <div key={tab.id} className={styles.tabButton}>
                    <Button variant="tab" active={activeTab === tab.id} onClick={() => onTabChange(tab.id)}>
                        {tab.label}
                    </Button>
                </div>
            ))}
        </div>
    )
}
