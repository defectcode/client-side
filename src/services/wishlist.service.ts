import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.config'
import { ISizeInput } from '@/shared/types/size.interface'
import {
	IStore,
	IStoreCreate,
	IStoreEdit
} from '@/shared/types/store.interface'
import { IWishlist } from '@/shared/types/wishlist.interface'

class WishlistService {
	async getById(id: string) {
		const { data } = await axiosWithAuth<IStore>({
			url: API_URL.wishlist(`/by-id/${id}`),
			method: 'GET'
		})

		return data
	}

	async create(productId: string, data: IWishlist) {
		const { data: createdWishlist } = await axiosWithAuth<IWishlist>({
		  url: API_URL.wishlist(`/create/${productId}`),
		  method: 'POST',
		  data
		});
	  
		return createdWishlist;
	}
	  

	async update(id: string, data: IWishlist) {
		const { data: updatedWishlist } = await axiosWithAuth<IWishlist>({
			url: API_URL.wishlist(`/${id}`),
			method: 'PUT',
			data
		})

		return updatedWishlist
	}

	async delete(id: string) {
		const { data: deletedWishlist } = await axiosWithAuth<IWishlist>({
			url: API_URL.wishlist(`/${id}`),
			method: 'DELETE'
		})

		return deletedWishlist
	}
}

export const wishlistService = new WishlistService()
