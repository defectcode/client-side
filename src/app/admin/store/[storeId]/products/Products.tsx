'use client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { STORE_URL } from '@/config/url.config'
import { useGetProducts } from '@/hooks/queries/products/useGetProducts'
import { formatPrice } from '@/utils/string/format-price'
import styles from '../Store.module.scss'
import { IProductColumn, productColumns } from './ProductColumns'

export function Products() {
	const params = useParams<{ storeId: string }>()

	const { products, isLoading } = useGetProducts()

	const formattedProducts: IProductColumn[] = products
		? products.map(product => ({
				id: product.id,
				title: product.title,
				price: formatPrice(product.price),
				times: product.times,
				discount: formatPrice(product.discount ?? 0),
				category: product.category.title,
				color: product.color.value,
				storeId: product.storeId
			}))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Products (${products?.length})`}
							description='All products in your store'
						/>
						<div className={styles.buttons}>
							{params?.storeId && (
								<Link href={STORE_URL.productCreate(params.storeId)}>
									<Button variant='primary'>
										<Plus />
										Create
									</Button>
								</Link>
							)}
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={productColumns}
							data={formattedProducts}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	)
}
