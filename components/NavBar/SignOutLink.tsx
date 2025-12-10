"use client"

import { SignOutButton } from "@clerk/nextjs"
import { useToast } from "../ui/use-toast"
import Link from "next/link"

function SignOutLink() {
    const { toast } = useToast()
    const handleLogout = () => {
        toast({
            description: "Logout Successful",
            variant: "default"
        })
    }
    return (
        <SignOutButton><Link className="w-full text-left" href="/" onClick={handleLogout}>logout</Link></SignOutButton>
    )
}
export default SignOutLink