
export interface Login {
    accessToken: string,
    user: User
}

export interface User {
    email: string,
    role: string,
    id: number
}

export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    type: string,
    dateEntry: string
}

export interface OrderProduct {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export interface OrderKitchen {
    userId: number,
    client: string,
    products: FinalProducts[],
    status: string,
    dateEntry: string
}
export interface FinalProducts {
    qty: number,
    product: ListProductsToKitchen,
}

export interface ListProductsToKitchen {
    id: number
    name: string,
    price: number,
    dateEntry: string
}



