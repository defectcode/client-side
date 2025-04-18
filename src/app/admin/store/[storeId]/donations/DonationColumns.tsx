import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { STORE_URL } from '@/config/url.config'
import { IDonation } from '@/shared/types/donation.interface'

export const donationColumns: ColumnDef<IDonation>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'value',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Meaning
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Date of creation
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<Link
						href={STORE_URL.donationEdit(
							row.original.storeId,
							row.original.id
						)}
					>
						<DropdownMenuItem>
							<Pencil className='size-4 mr-2' />
							Change
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
