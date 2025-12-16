"use client"
import { adminLinks } from "@/utils/links"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

function Sidebar() {
    const pathname = usePathname()
    return (
        <aside>
            {adminLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                    <Button asChild variant={pathname === link.href ? "default" : "ghost"} className="w-full mb-2 capitalize font-normal justify-start">
                        <span>{link.label}</span>
                    </Button>
                </Link>
            ))}
        </aside>
    )
}
export default Sidebar