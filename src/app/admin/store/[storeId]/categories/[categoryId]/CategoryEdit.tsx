'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { categoryService } from '@/services/category.service'

import { CategoryForm } from '../CategoryForm'

export function CategoryEdit() {
    const params = useParams<{ categoryId: string }>()
    
    if (!params || !params.categoryId) {
        return <div>Category ID is not available.</div>
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['get category', params.categoryId],
        queryFn: () => categoryService.getById(params.categoryId),
        enabled: !!params.categoryId
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return <CategoryForm category={data} />
}
