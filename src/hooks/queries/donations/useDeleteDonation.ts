import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { donationService } from '@/services/donation.service'

export const useDeleteDonation = () => {
	const params = useParams<{ storeId: string; donationId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: deleteDonation, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete donation'],
    mutationFn: () => {
        if (params?.donationId) {
            return donationService.delete(params.donationId);
        } else {
            console.error("Donation ID is missing");
            return Promise.reject(new Error("Donation ID is missing"));
        }
    },
    onSuccess() {
        queryClient.invalidateQueries({
            queryKey: ['get donations for store dashboard']
        });
        toast.success('Donation removed');
        if (params?.storeId) {
            router.push(STORE_URL.donations(params.storeId));
        } else {
            console.error("Store ID is missing");
        }
    },
    onError() {
        toast.error('Error while deleting donation');
    }
});



	return useMemo(
		() => ({ deleteDonation, isLoadingDelete }),
		[deleteDonation, isLoadingDelete]
	)
}
