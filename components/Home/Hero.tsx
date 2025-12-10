import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"

function Hero() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
            <div>
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">Shop the latest arrivals</h1>
                <p className="max-w-xl mt-4 text-lg leading-8 text-muted-foreground">Discover our latest arrivals, featuring the best in fashion and style. Shop now and get ready to make a statement!</p>
                <Button asChild className="mt-10" size="lg"><Link href="/products">Shop Now</Link></Button>
            </div>
            <HeroCarousel />
        </section>
    )
}
export default Hero