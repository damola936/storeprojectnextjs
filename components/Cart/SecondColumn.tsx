"use client"
import { useState } from "react"
import ProductAmountInput from "../SingleProduct/ProductAmountInput"
import { Mode } from "../SingleProduct/ProductAmountInput"
import FormContainer from "../Form/FormContainer"
import { SubmitButton } from "../Form/Buttons"
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions"
import { useToast } from "../ui/use-toast"

function SecondColumn({ quantity, id }: { quantity: number, id: string }) {
    const [amount, setAmount] = useState(quantity)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const handleAmountChange = async (value: number) => {
        setIsLoading(true)
        toast({ description: "Updating cart item..." })
        const result = await updateCartItemAction({ amount: value.toString(), cartItemId: id })
        setAmount(value)
        toast({ description: result.message })
        setIsLoading(false)
    }
    return (
        <div className="md:col-span-2">
            <ProductAmountInput
                amount={amount}
                setAmount={handleAmountChange}
                mode={Mode.CartItem}
                isLoading={isLoading}
            />
            <FormContainer action={removeCartItemAction}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton text="delete" className="mt-4" size="sm" />
            </FormContainer>
        </div>
    )
}
export default SecondColumn