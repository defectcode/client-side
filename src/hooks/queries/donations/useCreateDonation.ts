import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'
import { IDonationInput } from '@/shared/types/donation.interface'
import { donationService } from '@/services/donation.service'



export const useCreateDonation = () => {
	const params = useParams<{ storeId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: createDonation, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create donation'],
    mutationFn: (data: IDonationInput) => {
        if (params?.storeId) {
            return donationService.create(data, params.storeId);
        } else {
            console.error("Store ID is missing");
            return Promise.reject(new Error("Store ID is missing"));
        }
    },
    onSuccess() {
        queryClient.invalidateQueries({
            queryKey: ['get colors for store dashboard']
        });
        toast.success('Color created');
        if (params?.storeId) {
            router.push(STORE_URL.donations(params.storeId));
        }
    },
    onError() {
        toast.error('Error creating donation');
    }
});


	return useMemo(
		() => ({
			createDonation,
			isLoadingCreate
		}),
		[createDonation, isLoadingCreate]
	)
}
