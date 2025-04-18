import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CreateDonation } from './CreateDonation'

export const metadata: Metadata = {
	title: 'Creating color',
	...NO_INDEX_PAGE
}

export default function CreateColorPage() {
	return <CreateDonation />
}
