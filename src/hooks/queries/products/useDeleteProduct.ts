

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { productService } from '@/services/product.service'

export const useDeleteProduct = () => {
    const params = useParams<{ storeId: string; productId: string }>()
    const router = useRouter()

    const queryClient = useQueryClient()

    const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
        mutationKey: ['delete product'],
        mutationFn: () => {
            if (params?.productId) {
                return productService.delete(params.productId)
            } else {
                console.error("Product ID is missing")
                return Promise.reject(new Error("Product ID is missing"))
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get products for store dashboard']
            })
            toast.success('Product removed')
            if (params?.storeId) {
                router.push(STORE_URL.products(params.storeId))
            }
        },
        onError() {
            toast.error('Error while deleting item')
        }
    })

    return useMemo(
        () => ({ deleteProduct, isLoadingDelete }),
        [deleteProduct, isLoadingDelete]
    )
}
