export interface CartItem {
    productID: string;
    image: string;
    title: string
    price: string
    amount: number
    company: string
}

export interface CartState {
    cartItems: CartItem[]
    numItemsInCart: number
    cartTotal: number
    shipping:number
    tax: number
    orderTotal: number
}

export type actionFunction = (prevState: any, formData: FormData) => Promise<{message: string}>