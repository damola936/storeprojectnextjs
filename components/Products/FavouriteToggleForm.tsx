"use client"

import { usePathname } from "next/navigation"
import FormContainer from "../Form/FormContainer"
import { toggleFavouriteAction } from "@/utils/actions"
import { CardSubmitButton } from "../Form/Buttons"

interface FavouriteToggleFormProps {
    favouriteID: string | null
    productID: string
}

function FavouriteToggleForm({ favouriteID, productID }: FavouriteToggleFormProps) {
    const pathname = usePathname()
    const toggleAction = toggleFavouriteAction.bind(null, { productID, favouriteID, pathname })
    return (
        <FormContainer action={toggleAction}>
            <CardSubmitButton isFavourite={!!favouriteID} />
        </FormContainer>
    )
}
export default FavouriteToggleForm