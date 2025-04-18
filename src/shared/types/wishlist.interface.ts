import { IProduct } from "./product.interface";


export interface IWishlist {
    value: string;
    id: string,
    title: string,
    name: string,
    description: string,
    images: string[],
    productId: string,
    storeId: string,
}