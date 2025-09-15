/**
 * Header organism component
 * Main navigation header with logo and title
 */
import Image from "next/image";
import style from "@/styles/organisms/Header.module.css"

export default function Header() {
    return (
        <header className={style.header}>
            <Image className={style.imgLogo} src="/logo_The_Quantic_factory.webp" alt="Logo" width={100} height={100} />
            <h1 className={style.title}>Urban Fresh Next</h1>
        </header>
    );
}
