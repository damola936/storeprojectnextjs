import { fetchFeaturedProducts } from "@/utils/actions"
import SectionTitle from "../Global/SectionTitle"
import ProductsGrid from "../Products/ProductsGrid"
import EmptyList from "../Global/EmptyList"

async function FeaturedProducts() {
    const products = await fetchFeaturedProducts()
    if (!products || products.length === 0) return <EmptyList heading="No featured products found" />
    return (
        <div className="pt-24">
            <SectionTitle title="Featured Products" />
            <ProductsGrid products={products} />
        </div>
    )
}
export default FeaturedProducts