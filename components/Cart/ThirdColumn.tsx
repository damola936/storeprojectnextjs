import { formatCurrency } from "@/utils/format";

function ThirdColumn({ price }: { price: number }) {
    return (
        <div className="md:col-span-2">
            <p className="font-medium md:ml-auto">{formatCurrency(price)}</p>
        </div>
    );
}

export default ThirdColumn;