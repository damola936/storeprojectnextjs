"use client"
import type { CartItemWithProduct } from "@/utils/types";
import CartItemColumns from "./CartItemColumns"
import { Card } from "../ui/card";

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
    return (
        <div>
            {cartItems.map((cartItem) => (
                <Card className="mb-8 p-4" key={cartItem.id}>
                    <CartItemColumns
                        name={cartItem.product.name}
                        image={cartItem.product.image}
                        company={cartItem.product.company}
                        productId={cartItem.product.id}
                        price={cartItem.product.price}
                        amount={cartItem.amount}
                        id={cartItem.id}
                    />
                </Card>
            ))}
        </div>
    );
}

export default CartItemsList;