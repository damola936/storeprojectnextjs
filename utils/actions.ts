"use server"
import db from "./db";
import { redirect } from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {imageSchema, productSchema, validateWithZodSchema} from "@/utils/schemas";
import {uploadImage} from "@/utils/supabase";



const getAuthUser = async () => {
    const user = await currentUser()
    if(!user) redirect("/")
    return user
}

const getAdminUser = async () => {
    const user = await getAuthUser()
    const isAdminUser = process.env.ADMIN_USER_ID === user.id
    return isAdminUser? user: redirect("/")
}

const renderError = (error: unknown): {message: string} => {
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

export const fetchAllProducts = async ({ search }: { search: string }) => {
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
    try {
        const user = await getAuthUser()
        const rawData = Object.fromEntries(formData)
        const file = formData.get("image") as File
        const validateFields = validateWithZodSchema(productSchema, rawData)
        const validatedImage = validateWithZodSchema(imageSchema, {image: file})
        const fullImagePath = await uploadImage(validatedImage.image)

        await db.product.create({
            data: {
                ...validateFields,
                image: fullImagePath,
                clerkId: user.id
            }
        })
    } catch (error) {
        return  renderError(error)
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