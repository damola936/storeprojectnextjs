import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export enum Mode {
    SingleProduct = 'singleProduct',
    CartItem = 'cartItem',
}

type SelectProductAmountProps = {
    mode: Mode.SingleProduct;
    amount: number;
    setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
    mode: Mode.CartItem;
    amount: number;
    setAmount: (value: number) => Promise<void>;
    isLoading: boolean;
};


function ProductAmountInput(props: SelectProductAmountProps | SelectCartItemAmountProps) {
    const {mode, amount, setAmount} = props;
    const isCartItem = mode === Mode.CartItem;
    return (
        <div>
            <h4 className={"mb-2"}>Amount :</h4>
            <Select defaultValue={amount.toString()}
                    onValueChange={(value) => setAmount(Number(value))}
                    disabled={isCartItem ? props.isLoading : false}
            >
                <SelectTrigger className={isCartItem ? "w-[100px]" : "w-[150px]"}>
                    <SelectValue  placeholder={amount}/>
                </SelectTrigger>
                <SelectContent>
                    {Array.from({length: isCartItem? amount + 10: 10}, (_, index) => {
                        const value = String(index + 1)
                        return (
                            <SelectItem key={index} value={value}>
                                {value}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}

export default ProductAmountInput;