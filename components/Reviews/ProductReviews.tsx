import { fetchProductReviews } from "@/utils/actions";
import ReviewCard from "./ReviewCard";
import SectionTitle from "../Global/SectionTitle";

async function ProductReviews({ productID }: { productID: string }) {
    const reviews = await fetchProductReviews(productID)
    return (
        <div className="mt-16">
            <SectionTitle title="Reviews" />
            {reviews.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((review) => {
                        const { authorImageUrl: image, authorName: name, rating, comment } = review
                        const reviewInfo = { image, name, rating, comment }
                        return (
                            <ReviewCard key={review.id} reviewInfo={reviewInfo} />
                        )
                    })}
                </div>
            )}
        </div>
    );
}

export default ProductReviews;