import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
// import { CreateWishlist } from './CreateWishlist'


export const metadata: Metadata = {
	title: 'Create category',
	...NO_INDEX_PAGE
}

export default function CreateWishlistPage() {
	// return <CreateWishlist />
}
