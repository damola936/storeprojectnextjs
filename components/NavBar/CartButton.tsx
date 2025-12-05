import Link from "next/link"
import { Button } from "../ui/button"
import { LuShoppingCart } from "react-icons/lu"

function CartButton() {
    const numItemsInCart = 5
    return (
        <Button asChild size="icon" variant="outline" className="flex justify-center items-center relative">
            <Link href="/cart">
                <LuShoppingCart className="w-6 h-6" />
                <span className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full text-xs">{numItemsInCart}</span>
            </Link>
        </Button>
    )
}
export default CartButton