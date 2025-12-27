import SectionTitle from "@/components/Global/SectionTitle"
import ReviewCard from "@/components/Reviews/ReviewCard"
import { fetchProductReviewByUser, fetchSingleProduct, deleteReviewAction } from "@/utils/actions"
import { Review } from "@prisma/client"
import FormContainer from "@/components/Form/FormContainer"
import { IconButton } from "@/components/Form/Buttons"
import { auth } from "@clerk/nextjs/server"

async function ReviewsPage() {
    const { userId } = auth()
    const reviews = await fetchProductReviewByUser(userId as string)
    if (!reviews) return <SectionTitle title="You have no reviews" />
    return (
        <div>
            <SectionTitle title="Your Reviews" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(async (review: Review) => {
                    const { productId, rating, comment } = review
                    const { image, name } = await fetchSingleProduct(productId)
                    const reviewInfo = { rating, comment, image, name, productId }
                    return (
                        <ReviewCard reviewInfo={reviewInfo} key={review.id}>
                            <DeleteReview reviewID={review.id} />
                        </ReviewCard>
                    )
                })}
            </div>
        </div>
    )
}

function DeleteReview({ reviewID }: { reviewID: string }) {
    const deleteReview = deleteReviewAction.bind(null, { reviewID })
    return (
        <FormContainer action={deleteReview}>
            <IconButton actionType={"delete"} />
        </FormContainer>
    )
}

export default ReviewsPage