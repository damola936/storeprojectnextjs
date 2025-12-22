import {fetchUserFavourites} from "@/utils/actions"
import SectionTitle from "@/components/Global/SectionTitle";
import ProductsGrid from "@/components/Products/ProductsGrid";

async function FavouritesPage() {
    const favouriteProducts = await fetchUserFavourites()
    if (!favouriteProducts) {
        return (<SectionTitle title={"You have no favourites yet"}/>)
    }
    return (
        <div>
            <SectionTitle title={"Favourites"}/>
            <ProductsGrid products={favouriteProducts.map(favouriteProduct => favouriteProduct.product)}/>
        </div>
    )
}

export default FavouritesPage