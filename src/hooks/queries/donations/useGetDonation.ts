import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { donationService } from '../../../services/donation.service';

export const useGetDonation = () => {
	const params = useParams<{ storeId: string }>()

	const { data: donations, isLoading } = useQuery({
    queryKey: ['get donations for store dashboard'],
    queryFn: () => {
        if (params?.storeId) {
            return donationService.getByStoreId(params.storeId);
        } else {
            console.error("Store ID is missing");
            return Promise.reject(new Error("Store ID is missing"));
        }
    }
});



	return useMemo(
		() => ({
			donations,
			isLoading
		}),
		[donations, isLoading]
	)
}
