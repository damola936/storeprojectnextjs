"use client"

import {useState} from "react"
import ProductAmountInput, {Mode} from "@/components/SingleProduct/ProductAmountInput";
import {useAuth} from "@clerk/nextjs";
import FormContainer from "@/components/Form/FormContainer";
import {addToCartAction} from "@/utils/actions";
import {ProductSignInButton, SubmitButton} from "@/components/Form/Buttons";

function AddToCart({ productID }: { productID: string }) {
    const [amount, setAmount] = useState(1)
    const { userId } = useAuth()
    return (
        <div className={"mt-4"}>
            <ProductAmountInput mode={Mode.SingleProduct} amount={amount} setAmount={setAmount}/>
            {userId? <FormContainer action={addToCartAction}>
                <input type="hidden" name="productID" value={productID}/>
                <input type="hidden" name="amount" value={amount}/>
                <SubmitButton text={"Add to Cart"} className={"mt-8"}/>
            </FormContainer> :<ProductSignInButton/>}
        </div>
    )
}
export default AddToCart