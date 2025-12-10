import { LuStar } from "react-icons/lu"

function ProductRating({ productID }: { productID: string }) {
    const rating = 4.2
    const count = 24
    return (
        <div>
            <span className="flex items-center gap-1 text-medium mt-1 mb-4">
                <LuStar className="w-3 h-3" />
                <span className="text-sm">{rating} ({count})</span>
            </span>
        </div>
    )
}
export default ProductRating