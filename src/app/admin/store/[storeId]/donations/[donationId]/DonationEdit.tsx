

'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { donationService } from '@/services/donation.service'
import { DonationForm } from '../DonationForm'


export function DonationEdit() {
	const params = useParams<{ donationId: string }>()

	const { data } = useQuery({
		queryKey: ['get donations', params?.donationId], 
		queryFn: () => (params ? donationService.getById(params.donationId) : Promise.reject('No donationId')),
		enabled: !!params?.donationId 
	})

	return <DonationForm donation={data} />
}
