import { IProduct } from "./product.interface";



export interface IRewards {
    name: unknown;
    includes: any;
    id: string,
    createdAt: string,
    title: string,
    description: string,
    price: number,
    productId: IProduct
}