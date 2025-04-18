import { ICategory } from './category.interface'
import { IColor } from './color.interface'
import { IReview } from './review.interface'

export interface IProduct {
    breakdown: {
        week: string; category: string; cost: number; 
}[];
    goalAmount: any;
    video?: string;
    selectedSize: string;
	dateAdded: string | number | Date;
	discountedPrice: number;
	id: string;
	title: string;
	description: string;
	price: number;
	times: number;
	createdAt: string | Date;
	discount?: number;
	images: string[];
	category: ICategory;
	reviews: IReview[];
	color: IColor;
	storeId: string;
	gender: string;
	size: string[]; 
	donationDescriptions: string[],
	donationAmounts: number[]
  }
  
  export interface IProductInput extends Omit<IProduct, 'id' | 'reviews' | 'storeId' | 'category' | 'color' | 'video'> {
	categoryId: string;
	colorId: string;
	size: string[];
	video: string;
	createdAt: string;
  }
  