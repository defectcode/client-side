import { wishlistService } from '@/services/wishlist.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { IWishlist } from '@/shared/types/wishlist.interface';

interface UpdateWishlistArgs {
  id: string;
  data: IWishlist;
}

export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();

  const { mutate: updateWishlist, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update wishlist'],
    mutationFn: ({ id, data }: UpdateWishlistArgs) => wishlistService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get wishlist for store dashboard'] });
      toast.success('Wishlist updated');
    },
    onError: () => {
      toast.error('Error updating wishlist');
    },
  });

  return { updateWishlist, isLoadingUpdate };
};
