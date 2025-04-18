'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { STORE_URL } from '@/config/url.config'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'
import { IColor } from '@/shared/types/color.interface'
import { formatDate } from '@/utils/date/format-date'
import styles from '../Store.module.scss'
import { donationColumns } from './DonationColumns'
import { IDonation } from '@/shared/types/donation.interface'
import { useGetDonation } from '@/hooks/queries/donations/useGetDonation'


interface DonationTableRow {
	id: string;
	createdAt: string;
	description: string;
	storeId: string;
  }
  

export function Donations() {
	const params = useParams<{ storeId: string }>()
	const { donations, isLoading } = useGetDonation()

	const formattedDonation: DonationTableRow[] = donations
		? donations.map(donation => ({
			id: donation.id,
			createdAt: formatDate(donation.createdAt),
			description: donation.description,
			amountGoal: donation.amountGoal,
			storeId: donation.storeId,
			}))
		: [];

  
	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Colors (${donations?.length})`}
							description='All colors of your store'
						/>
						<div className={styles.buttons}>
							<Link href={STORE_URL.donationCreate(params?.storeId)}>
								<Button variant='primary'>
									<Plus />
									Create
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
					<DataTable
						columns={donationColumns}
						data={donations || []}
						filterKey='name'
					/>

					</div>
				</>
			)}
		</div>
	)
}


