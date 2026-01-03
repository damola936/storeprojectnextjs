import type {Cart} from "@prisma/client"
import {CardTitle, Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {formatCurrency} from "@/utils/format";
import {createOrderAction} from "@/utils/actions";
import FormContainer from "@/components/Form/FormContainer";
import {SubmitButton} from "@/components/Form/Buttons";

function CartTotals({cart}: { cart: Cart }) {
    const {cartTotal, shipping, tax, orderTotal} = cart
    return (
        <div>
            <Card className={"p-8"}>
                <CartTotalRow label={"Subtotal"} amount={cartTotal}/>
                <CartTotalRow label={"Shipping"} amount={shipping}/>
                <CartTotalRow label={"Tax"} amount={tax}/>
                <CardTitle><CartTotalRow label={"Total"} amount={orderTotal} lastRow={true}/></CardTitle>
            </Card>
            <FormContainer action={createOrderAction}>
                <SubmitButton className={"mt-8 w-full"} text={"Place Order"}/>
            </FormContainer>
        </div>
    );
}

function CartTotalRow({label, amount, lastRow}: { label: string, amount: number, lastRow?: boolean }) {
    return (
        <div>
            <div className={"flex justify-between text-sm"}>
                <span>{label}</span>
                <span>{formatCurrency(amount)}</span>
            </div>
            {lastRow ? null : <Separator className={"my-2"}/>}
        </div>

    )
}

export default CartTotals;