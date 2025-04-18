import { Trash } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form-elements/Form';
import { Input } from '@/components/ui/form-elements/Input';
import { ImageUpload } from '@/components/ui/form-elements/image-upload/ImageUpload';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';
import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct';
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct';
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct';
import { ICategory } from '@/shared/types/category.interface';
import { IColor } from '@/shared/types/color.interface';
import { IProduct, IProductInput } from '@/shared/types/product.interface';
import styles from '../Store.module.scss';
import { ISize } from '@/shared/types/size.interface';
import { VideoUpload } from '@/components/ui/form-elements/video-upload/VideoUpload';

interface ProductFormProps {
  product?: IProduct;
  categories: ICategory[];
  colors: IColor[];
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
  const { createProduct, isLoadingCreate } = useCreateProduct();
  const { updateProduct, isLoadingUpdate } = useUpdateProduct();
  const { deleteProduct, isLoadingDelete } = useDeleteProduct();

  const form = useForm<IProductInput>({
    mode: 'onChange',
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      images: product?.images || [],
      price: product?.price || 0,
      times: product?.times || 0,
      video: product?.video || '',
      categoryId: product?.category?.id || '',
      colorId: product?.color?.id || '',
      createdAt: product?.createdAt?.toString() || new Date().toISOString(), 
      donationDescriptions: product?.donationDescriptions || [], 
      donationAmounts: product?.donationAmounts || [], 
      size: product?.size || [], 
    },
  });
  
  
  const onSubmit: SubmitHandler<IProductInput> = (data) => {
    data.price = Number(data.price);
    data.discount = data.discount ? Number(data.discount) : undefined;
    data.times = Number(data.times);
    if (product) updateProduct(data);
    else createProduct(data);
    console.log('this is data:', data)
  };

  


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading
          title={product ? 'Edit data' : 'Create a product'}
          description={
            product ? 'Edit product details' : 'Add new product to the store'
          }
        />
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
            <Button size="icon" variant="primary" disabled={isLoadingDelete}>
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="images"
            rules={{
              required: 'Upload at least one image',
            }}
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Pictures</FormLabel>
                <FormControl>
                  <ImageUpload
                    isDisabled={isLoadingCreate || isLoadingUpdate}
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
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <VideoUpload
                    isDisabled={isLoadingCreate || isLoadingUpdate}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={styles.fields}>
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: 'Name is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product name"
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              rules={{
                required: 'Price is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price of the product"
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="times"
              rules={{
                required: 'Times is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Times</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Times of the product"
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="donationDescriptions"
              rules={{ required: 'Description for donation is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description for Donation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Example: Camera Sony X1, Microphone ECM-W3"
                      value={field.value.join(', ')}
                      onChange={(e) => field.onChange(
                        e.target.value.split(',').map(s => s.trim())
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="donationAmounts"
              rules={{ required: 'Price for donation is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price for Donation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Example: 100, 175"
                      value={field.value.join(', ')}
                      onChange={(e) => field.onChange(
                        e.target.value.split(',').map(s => s.trim())
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}



            <FormField
              control={form.control}
              name="categoryId"
              rules={{
                required: 'Category is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoadingCreate || isLoadingUpdate}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Product category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              rules={{
                required: 'Color is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={isLoadingCreate || isLoadingUpdate}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Product color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{
              required: 'Description is required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description of product"
                    disabled={isLoadingCreate || isLoadingUpdate}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="primary"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {product ? 'Save' : 'Create'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
