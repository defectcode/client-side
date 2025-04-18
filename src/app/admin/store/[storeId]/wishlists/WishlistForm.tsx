'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form-elements/Form';
import { Input } from '@/components/ui/form-elements/Input';
import { ImageUpload } from '@/components/ui/form-elements/image-upload/ImageUpload'; // ✅ import

import styles from '../Store.module.scss';
import { useCreateWishlist } from '@/hooks/queries/wishlists/useCreateWishlist';
import { IWishlist } from '@/shared/types/wishlist.interface';
import { useUpdateWishlist } from '@/hooks/queries/wishlists/useUpdateWishlist';
import { IProduct } from '@/shared/types/product.interface';
import { IStore } from '@/shared/types/store.interface';

interface WishlistFormProps {
  wishlist: IWishlist;
  product: IProduct;
  store: IStore;
}

export function WishlistForm({ wishlist, product, store }: WishlistFormProps) {
  const { createWishlist, isLoadingCreate } = useCreateWishlist(product.id!, store.id!);
  const { updateWishlist, isLoadingUpdate } = useUpdateWishlist();
  

  const title = wishlist ? 'Edit wishlist' : 'Create wishlist';
  const action = wishlist ? 'Save' : 'Create';

  const form = useForm<WishlistFormProps>({
    mode: 'onChange',
    defaultValues: {
      wishlist: {
        title: wishlist?.title || '',
        description: wishlist?.value || '',
        images: wishlist?.images || [],
        id: wishlist?.id || '',
      },
    },
  });

  const onSubmit: SubmitHandler<WishlistFormProps> = (data) => {
    createWishlist(data.wishlist);
  };

  return (
    <div className={styles.wrapper}>
      <Heading title={title} description="Manage wishlist in your store" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="wishlist.images"
            rules={{
              required: 'Upload at least one image',
            }}
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Pictures</FormLabel>
                <FormControl>
                  <ImageUpload
                    isDisabled={isLoadingCreate}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wishlist.title"
            rules={{
              required: 'Wishlist title is required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[24px]">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter wishlist title (e.g., Summer Shoes)"
                    disabled={isLoadingCreate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wishlist.description"
            rules={{
              required: 'Description is required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[24px]">Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter wishlist description"
                    disabled={isLoadingCreate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="primary" disabled={isLoadingCreate}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
