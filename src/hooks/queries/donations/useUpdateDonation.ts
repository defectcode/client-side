import { donationService } from '@/services/donation.service'
import { IDonation } from '@/shared/types/donation.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'


export const useUpdateDonation = () => {
	const params = useParams<{ donationId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateDonation, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update color'],
    mutationFn: (data: IDonation) => {
        if (params?.donationId) {
            return donationService.update(params.donationId, data);
        } else {
            console.error("Donation ID is missing");
            return Promise.reject(new Error("Donation ID is missing"));
        }
    },
    onSuccess() {
        queryClient.invalidateQueries({
            queryKey: ['get donations for store dashboard']
        });
        toast.success('Donation updated');
    },
    onError() {
        toast.error('Error updating donation');
    }
});



	return useMemo(
		() => ({ updateDonation, isLoadingUpdate }),
		[updateDonation, isLoadingUpdate]
	)
}
