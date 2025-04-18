// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { wishlistService } from '@/services/wishlist.service'


// export const useDeleteWishlist = () => {
//   const queryClient = useQueryClient();

//   const { mutate: wishlistService, isPending: isLoadingDelete } = useMutation({
//     mutationKey: ['delete size'],
//     mutationFn: (id: string) => wishlistService.delete(id),
//     onSuccess: () => {
//       // queryClient.invalidateQueries('get sizes');
//       toast.success('Size deleted');
//     },
//     onError: () => {
//       toast.error('Error deleting size');
//     },
//   });

//   return { deleteSize, isLoadingDelete };
// };
