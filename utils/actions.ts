"use server"
import db from "./db";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {imageSchema, productSchema, validateWithZodSchema} from "@/utils/schemas";
import {deleteImageFromBucket, uploadImageToBucket} from "@/utils/supabase";
import {revalidatePath} from 'next/cache'


const getAuthUser = async () => {
    const user = await currentUser()
    if (!user) redirect("/")
    return user
}

const getAdminUser = async () => {
    const user = await getAuthUser()
    const isAdminUser = process.env.ADMIN_USER_ID === user.id
    return isAdminUser ? user : redirect("/")
}

const renderError = (error: unknown): { message: string } => {
    console.log(error)
    return {message: error instanceof Error ? error.message : "Error occurred."}
}

export const fetchFeaturedProducts = async () => {
    const products = await db.product.findMany({
        where: {
            featured: true
        }
    })
    return products
}

export const fetchAllProducts = async ({search}: { search: string }) => {
    const products = await db.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    company: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            ]
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return products
}

export const fetchSingleProduct = async (productId: string) => {
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        redirect("/")
    }
    return product
}

export const createProductAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
    await getAdminUser()
    try {
        const user = await getAuthUser()
        const rawData = Object.fromEntries(formData)
        const file = formData.get("image") as File
        const validatedFields = validateWithZodSchema(productSchema, rawData)
        const validatedImage = validateWithZodSchema(imageSchema, {image: file})
        const fullImagePath = await uploadImageToBucket(validatedImage.image)

        await db.product.create({
            data: {
                ...validatedFields,
                image: fullImagePath,
                clerkId: user.id
            }
        })
    } catch (error) {
        return renderError(error)
    }
    redirect("/admin/products")
}

export const fetchAdminProducts = async () => {
    await getAdminUser()
    const adminProducts = await db.product.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return adminProducts
}

export const deleteProductAction = async (prevState: { productID: string }) => {
    const {productID} = prevState
    await getAdminUser()
    try {
        const deletedProduct = await db.product.delete({
            where: {
                id: productID
            }
        })
        await deleteImageFromBucket(deletedProduct.image)
        revalidatePath("/admin/products")
        return {message: "Successfully deleted product"};
    } catch (error) {
        return renderError(error)
    }

}

export const fetchAdminProductById = async (productId: string) => {
    await getAdminUser()
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        redirect("/admin/products")
    }
    return product

}

export const updateProductAction = async (prevState: any, formData: FormData) => {
    const productID = formData.get("id") as string
    await getAdminUser()
    try {
        const rawData = Object.fromEntries(formData)
        const validatedFields = validateWithZodSchema(productSchema, rawData)
        await db.product.update({
            where: {
                id: productID
            },
            data: {
                ...validatedFields,
            }
        })
        revalidatePath(`/admin/products/${productID}/edit`)
        return {message: "Successfully updated product"};
    } catch (error) {
        return renderError(error)
    }
}

export const updateProductImageAction = async (prevState: any, formData: FormData) => {
    const productID = formData.get("id") as string
    const image = formData.get("image") as File
    const oldImageUrl = formData.get("oldUrl") as string
    await getAdminUser()
    try {
        const validatedImage = validateWithZodSchema(imageSchema, {image: image})
        const newUploadedImagePath = await uploadImageToBucket(validatedImage.image)
        await deleteImageFromBucket(oldImageUrl)
        await db.product.update({
            where: {
                id: productID
            },
            data: {
                image: newUploadedImagePath
            }
        })
        revalidatePath(`/admin/products/${productID}/edit`)
        return {message: "Product Image updated successfully."}
    } catch (error) {
        return renderError(error)
    }

}

export const fetchFavouriteId = async ({productID}: { productID: string }) => {
    const user = await getAuthUser()
    const favourite = await db.favourite.findFirst({
        where: {
            productId: productID,
            clerkId: user.id
        },
        select: {id: true}
    })
    return favourite?.id || null
}

export const toggleFavouriteAction = async (prevState: {
    productID: string,
    favouriteID: string | null,
    pathname: string
}) => {
    const {productID, favouriteID, pathname} = prevState
    const user = await getAuthUser()
    if (!favouriteID) {
        try {
            await db.favourite.create({
                data: {
                    clerkId: user.id,
                    productId: productID
                }
            })
            revalidatePath(pathname)
            return {message: "Product Added to Favourites"}
        } catch (error) {
            return renderError(error)
        }
    } else {
        try {
            await db.favourite.delete({
                where: {
                    id: favouriteID
                }
            })
            revalidatePath(pathname)
            return {message: "Product Removed from Favourites"}
        } catch (error) {
            return renderError(error)
        }
    }
}

export const fetchUserFavourites = async () => {
    const user = await getAuthUser()
    const favourites = await db.favourite.findMany({
        where: {
            clerkId: user.id
        },
        include: {
            product: true
        }
    })
    return favourites
}