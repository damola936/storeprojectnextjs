"use client"
import { useState } from "react";
import { SubmitButton } from "../Form/Buttons";
import FormContainer from "../Form/FormContainer";
import { Card } from "../ui/card";
import RatingInput from "./RatingInput";
import TextAreaInput from "../Form/TextAreaInput";
import { Button } from "../ui/button";
import { createReviewAction } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";

function SubmitReviews({ productID }: { productID: string }) {
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
    const { user } = useUser()
    return (
        <div>
            {isReviewFormVisible ? (
                <Card className="p-8 mt-8">
                    <FormContainer action={createReviewAction}>
                        <RatingInput name="rating" />
                        <TextAreaInput name="comment" label="Feedback" defaultValue="Outstanding Product" />
                        <input type="hidden" name="productId" value={productID} />
                        <input type="hidden" name="authorName" value={user?.firstName || "user"} />
                        <input type="hidden" name="authorImageUrl" value={user?.imageUrl || ""} />
                        <SubmitButton className="mt-4" />
                    </FormContainer>
                </Card>
            ) : (
                <Button onClick={() => setIsReviewFormVisible(!isReviewFormVisible)} className="capitalize mt-8" size="lg">Submit Review</Button>
            )}
        </div>
    );
}

export default SubmitReviews;