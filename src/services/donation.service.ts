import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'
import { IDonation, IDonationInput } from '@/shared/types/donation.interface'


class DonationService {
	async getByStoreId(id: string) {
		const { data } = await axiosWithAuth<IDonation[]>({
			url: API_URL.donation(`/by-storeId/${id}`),
			method: 'GET'
		})

		return data || []
	}

	async getByProductId(productId: string) {
		console.log('[FRONTEND] Getting donations for:', productId); // ADĂUGĂ ASTA
		const { data } = await axiosWithAuth<IDonation[]>({
		  url: `http://localhost:5000/donation/product/${productId}`,
		  method: 'GET',
		});
	  
		return data || [];
	  }
	  
	  
	  
	async getById(id: string) {
		const { data } = await axiosWithAuth<IDonation>({
			url: API_URL.donation(`/by-id/${id}`),
			method: 'GET'
		})

		return data
	}

	async create(data: IDonationInput, storeId: string) {
		const { data: createdDonation } = await axiosWithAuth<IDonation>({
			url: API_URL.donation(`/${storeId}`),
			method: 'POST',
			data
		})

		return createdDonation
	}

	async update(id: string, data: IDonationInput) {
		const { data: updatedDonation } = await axiosWithAuth<IDonation>({
			url: API_URL.donation(`/${id}`),
			method: 'PUT',
			data
		})

		return updatedDonation
	}

	async delete(id: string) {
		const { data: deletedDonation } = await axiosWithAuth<IDonation>({
			url: API_URL.donation(`/${id}`),
			method: 'DELETE'
		})

		return deletedDonation
	}
}

export const donationService = new DonationService()
