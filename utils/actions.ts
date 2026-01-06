"use server";
import db from "./db";
import { redirect } from "next/navigation";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "@/utils/schemas";
import { deleteImageFromBucket, uploadImageToBucket } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import type { Cart } from "@prisma/client";

const getAuthUser = async () => {
  const user = await currentUser();
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  const isAdminUser = process.env.ADMIN_USER_ID === user.id;
  return isAdminUser ? user : redirect("/");
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "Error occurred.",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search }: { search: string }) => {
  const products = await db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          company: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/");
  }
  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAdminUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedImage = validateWithZodSchema(imageSchema, { image: file });
    const fullImagePath = await uploadImageToBucket(validatedImage.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullImagePath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const adminProducts = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return adminProducts;
};

export const deleteProductAction = async (prevState: { productID: string }) => {
  const { productID } = prevState;
  await getAdminUser();
  try {
    const deletedProduct = await db.product.delete({
      where: {
        id: productID,
      },
    });
    await deleteImageFromBucket(deletedProduct.image);
    revalidatePath("/admin/products");
    return { message: "Successfully deleted product" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductById = async (productId: string) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/admin/products");
  }
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  const productID = formData.get("id") as string;
  await getAdminUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    await db.product.update({
      where: {
        id: productID,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productID}/edit`);
    return { message: "Successfully updated product" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  const productID = formData.get("id") as string;
  const image = formData.get("image") as File;
  const oldImageUrl = formData.get("oldUrl") as string;
  await getAdminUser();
  try {
    const validatedImage = validateWithZodSchema(imageSchema, { image: image });
    const newUploadedImagePath = await uploadImageToBucket(
      validatedImage.image
    );
    await deleteImageFromBucket(oldImageUrl);
    await db.product.update({
      where: {
        id: productID,
      },
      data: {
        image: newUploadedImagePath,
      },
    });
    revalidatePath(`/admin/products/${productID}/edit`);
    return { message: "Product Image updated successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavouriteId = async ({
  productID,
}: {
  productID: string;
}) => {
  const user = await getAuthUser();
  if (!user) return null;
  const favourite = await db.favourite.findFirst({
    where: {
      productId: productID,
      clerkId: user.id,
    },
    select: { id: true },
  });
  return favourite?.id || null;
};

export const toggleFavouriteAction = async (prevState: {
  productID: string;
  favouriteID: string | null;
  pathname: string;
}) => {
  const { productID, favouriteID, pathname } = prevState;
  const user = await getAuthUser();
  if (!user) redirect("/");
  if (!favouriteID) {
    try {
      await db.favourite.create({
        data: {
          clerkId: user.id,
          productId: productID,
        },
      });
      revalidatePath(pathname);
      return { message: "Product Added to Favourites" };
    } catch (error) {
      return renderError(error);
    }
  } else {
    try {
      await db.favourite.delete({
        where: {
          id: favouriteID,
        },
      });
      revalidatePath(pathname);
      return { message: "Product Removed from Favourites" };
    } catch (error) {
      return renderError(error);
    }
  }
};

export const fetchUserFavourites = async () => {
  const user = await getAuthUser();
  if (!user) return [];
  const favourites = await db.favourite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favourites;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);
    const existingReview = await findExistingReview(validatedFields.productId);
    if (existingReview) {
      return { message: "You have already reviewed this product" };
    }
    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review created successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchProductReviewByUser = async (userId: string) => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  const reviews = await db.review.findMany({
    where: {
      clerkId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const deleteReviewAction = async ({
  reviewID,
}: {
  reviewID: string;
}) => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  try {
    await db.review.delete({
      where: {
        id: reviewID,
      },
    });
    revalidatePath("/reviews");
    return { message: "Review deleted successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (productId: string) => {
  const user = await currentUser();
  if (!user) return null;
  const existingReview = await db.review.findFirst({
    where: {
      productId: productId,
      clerkId: user.id,
    },
  });
  return existingReview;
};

export const fetchProductRating = async (productId: string) => {
  const ratings = await db.review.findMany({
    where: {
      productId: productId,
    },
    select: {
      rating: true,
    },
  });
  const averageRatings =
    ratings.length > 0
      ? ratings.reduce((acc, review) => acc + review.rating, 0) / ratings.length
      : 0;
  return { ratings, averageRatings };
};

export const fetchNoOfCartItems = async () => {
  const user = await getAuthUser();
  if (!user) return 0;
  const cart = await db.cart.findFirst({
    where: {
      clerkId: user.id,
    },
  });
  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  } else return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }
  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  const existingCartItem = await db.cartItem.findFirst({
    where: {
      productId: productId,
      cartId: cartId,
    },
  });
  if (existingCartItem) {
    const cartItem = await db.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        amount: amount + existingCartItem.amount,
      },
    });
    return cartItem;
  } else {
    const cartItem = await db.cartItem.create({
      data: {
        productId: productId,
        cartId: cartId,
        amount: amount,
      },
    });
    return cartItem;
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const numItemsInCart = cartItems.reduce((acc, item) => acc + item.amount, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.amount * item.product.price,
    0
  );
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? 5 : 0;
  const orderTotal = cartTotal + tax + shipping;
  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart: numItemsInCart,
      orderTotal: orderTotal,
      cartTotal: cartTotal,
      shipping: shipping,
      tax: tax,
    },
    include: includeProductClause,
  });
  return { currentCart, cartItems };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  try {
    const productId = formData.get("productID") as string;
    const amount = parseInt(formData.get("amount") as string);
    const product = await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({
      productId: product.id,
      cartId: cart.id,
      amount,
    });
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.delete({
      where: {
        id: formData.get("id") as string,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Cart item removed successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: string;
  cartItemId: string;
}) => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount: parseInt(amount),
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Cart item updated successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let orderId: null | string = null;
  let cartId: null | string = null;
  if (!user) redirect("/");
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;
    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });
    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  if (!user) redirect("/");
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  const user = getAdminUser();
  if (!user) redirect("/");
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};
