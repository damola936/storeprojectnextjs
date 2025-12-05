import { LuCircleDollarSign } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";

function Logo() {
    return (
        <Button asChild size="icon">
            <Link href="/"><LuCircleDollarSign className="w-6 h-6" /></Link>
        </Button>
    )
}
export default Logo