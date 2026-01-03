import CartItemsList from "@/components/Cart/CartItemsList";
import CartTotals from "@/components/Cart/CartTotals";
import SectionTitle from "@/components/Global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


async function CartPage() {
    const { userId } = auth()
    if (!userId) redirect("/")
    const cart = await fetchOrCreateCart({ userId })
    const { cartItems } = await updateCart(cart)
    if (cartItems.length === 0) return (
        <SectionTitle title={"Your cart is empty"} />
    )
    return (
        <div>
            <SectionTitle title={"Your cart"} />
            <div className={"mt-8 grid gap-4 lg:grid-cols-12"}>
                <div className={"lg:col-span-8"}><CartItemsList cartItems={cartItems} /></div>
                <div className={"lg:col-span-4"}><CartTotals cart={cart} /></div>
            </div>
        </div>

    )
}



export default CartPage