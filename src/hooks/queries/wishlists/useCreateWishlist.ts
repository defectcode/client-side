import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'
import { wishlistService } from '@/services/wishlist.service'
import { IWishlist } from '@/shared/types/wishlist.interface'

export const useCreateWishlist = (productId: string, storeId: string) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate: createWishlist, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create wishlist'],
		mutationFn: (data: IWishlist) => {
			if (productId) {
				return wishlistService.create(productId, data);
			} else {
				console.error('Product ID is missing');
				return Promise.reject(new Error('Product ID is missing'));
			}
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get wishlist for store dashboard'],
			});
			toast.success('Wishlist created');
			if (storeId) {
				router.push(STORE_URL.wishlists(storeId));
			}
		},
		onError() {
			toast.error('Error creating wishlist');
		},
	});

	return useMemo(
		() => ({
			createWishlist,
			isLoadingCreate,
		}),
		[createWishlist, isLoadingCreate]
	);
};
