"use client"
import {Card, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

function loading() {
    return (
        <section  className={"grid md:grid-cols-2 lg:grid-cols-3 gap-6"}>
            <ReviewLoadingCard />
            <ReviewLoadingCard/>
            <ReviewLoadingCard/>
            <ReviewLoadingCard/>
            <ReviewLoadingCard/>
            <ReviewLoadingCard/>
        </section>
    )
}

const ReviewLoadingCard = () => {
    return (
        <Card>
            <CardHeader>
                <div className={"flex items-center"}>
                    <Skeleton className={"h-12 w-12 rounded-full"} />
                    <div className={"ml-4"}>
                        <Skeleton className={"w-[250px] h-4 mb-2"} />
                        <Skeleton className={"w-[250px] h-4"} />
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
export default loading