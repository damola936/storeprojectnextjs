import { LuHeart } from "react-icons/lu";
import { Button } from "../ui/button";
import {auth} from "@clerk/nextjs/server"
import {CardSignInButton} from "@/components/Form/Buttons";
import {fetchFavouriteId} from "@/utils/actions";
import FavouriteToggleForm from "@/components/Products/FavouriteToggleForm";

async function FavouriteToggleButton({ productID }: { productID: string }) {
    const {userId}  = auth()
    if(!userId) return (
        <CardSignInButton/>
    )
    const favouriteID = await fetchFavouriteId({productID})
    return (
        <FavouriteToggleForm favouriteID={favouriteID} productID={productID}/>
    )
}
export default FavouriteToggleButton