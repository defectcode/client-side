import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Donations } from './Donations'

export const metadata: Metadata = {
	title: 'Colors',
	...NO_INDEX_PAGE
}

export default function ColorsPage() {
	return <Donations />
}
