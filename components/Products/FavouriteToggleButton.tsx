import { LuHeart } from "react-icons/lu";
import { Button } from "../ui/button";

function FavouriteToggleButton({ productID }: { productID: string }) {
    return (
        <Button size="icon" variant="outline" className="p-2 cursor-pointer">
            <LuHeart />
        </Button>
    )
}
export default FavouriteToggleButton