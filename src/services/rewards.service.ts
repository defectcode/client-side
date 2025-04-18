import { axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IRewards } from "@/shared/types/rewards.interface";


class RewardsService {

    async getByStoreId(id: string) {
        const { data } = await axiosWithAuth<IRewards[]>({
            url: API_URL.rewards(`/by-storeId/${id}`),
            method: 'GET',
        })
    }

    async create(productId: string) {
        const { data: createRewards } = await axiosWithAuth<IRewards>({
            url: API_URL.rewards(`/create/${productId}`),
            method: 'POST',
        })

        return createRewards;
    }


    async datele(id: string) {
        const { data: deleteRewards } = await axiosWithAuth<IRewards>({
            url: API_URL.rewards(`/${id}`),
            method: 'DELETE'
        })

        return deleteRewards;
    }

}


export const rewardsService = new RewardsService()