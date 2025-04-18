import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DonationEdit } from './DonationEdit'

export const metadata: Metadata = {
	title: 'Color settings',
	...NO_INDEX_PAGE
}

export default function ColorEditPage() {
	return <DonationEdit />
}
