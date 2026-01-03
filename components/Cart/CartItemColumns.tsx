import FirstColumn from "./FirstColumn"
import SecondColumn from "./SecondColumn"
import ThirdColumn from "./ThirdColumn"

interface CartItemColumnsProps {
    name: string;
    image: string;
    company: string;
    productId: string;
    price: number;
    amount: number;
    id: string;
}

function CartItemColumns({
    name,
    image,
    company,
    productId,
    price,
    amount,
    id,
}: CartItemColumnsProps) {
    return (
        <div className="grid md:grid-cols-8 gap-4 items-center">
            <FirstColumn name={name} image={image} company={company} productId={productId} />
            <SecondColumn quantity={amount} id={id} />
            <ThirdColumn price={price} />
        </div>
    );
}

export default CartItemColumns;