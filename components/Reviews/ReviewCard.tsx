import Rating from "./Rating";
import Comment from "./Comment";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

interface ReviewCardProps {
    reviewInfo: {
        image: string,
        name: string,
        rating: number,
        comment: string,
        productId?: string
    },
    children?: React.ReactNode
}

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
    const hrefLink = reviewInfo.productId ? `/products/${reviewInfo.productId}` : "#"
    return (
        <Card className="relative my-8">
            <Link href={hrefLink}>
                <CardHeader>
                    <div className="flex items-center gap-x-2">
                        <Image src={reviewInfo.image} alt={reviewInfo.name} className="w-12 h-12 rounded-full object-cover" width={48} height={48} />
                        <div className="ml-4">
                            <h3 className="text-sm font-bold capitalize mb-1">{reviewInfo.name}</h3>
                            <Rating rating={reviewInfo.rating} />
                        </div>
                    </div>
                </CardHeader>
            </Link>
            <CardContent>
                <Comment comment={reviewInfo.comment} />
            </CardContent>
            <div className="absolute top-3 right-3">{children}</div>
        </Card>
    );
}

export default ReviewCard;