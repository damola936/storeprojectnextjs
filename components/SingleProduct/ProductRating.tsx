import { fetchProductRating } from "@/utils/actions"
import { LuStar } from "react-icons/lu"

async function ProductRating({ productID }: { productID: string }) {
    const { ratings, averageRatings } = await fetchProductRating(productID)
    return (
        <div>
            <span className="flex items-center gap-1 text-medium mt-1 mb-4">
                <LuStar className="w-3 h-3" />
                {averageRatings > 0 ? <span className="text-sm">{averageRatings} ({ratings.length})</span> : <span className="text-sm">No ratings yet</span>}
            </span>
        </div>
    )
}
export default ProductRating