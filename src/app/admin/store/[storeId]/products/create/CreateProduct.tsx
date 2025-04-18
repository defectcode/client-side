'use client'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { ProductForm } from '../ProductForm'
import { IProduct } from '@/shared/types/product.interface'

interface CreateProductProps {
	product: IProduct[]
}

export function CreateProduct({ product }: CreateProductProps) {
	const { categories } = useGetCategories()
	const { colors } = useGetColors()

	return <ProductForm categories={categories || []} colors={colors || []} />
}
