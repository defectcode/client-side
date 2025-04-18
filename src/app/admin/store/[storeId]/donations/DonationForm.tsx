import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import styles from '../Store.module.scss'
import { useCreateDonation } from '@/hooks/queries/donations/useCreateDonation'
import { useUpdateDonation } from '@/hooks/queries/donations/useUpdateDonation'
import { useDeleteDonation } from '@/hooks/queries/donations/useDeleteDonation'
import { IDonation, IDonationInput } from '@/shared/types/donation.interface'

interface DonationFormProps {
	donation?: IDonation
}

export function DonationForm({ donation }: DonationFormProps) {
	const { createDonation, isLoadingCreate } = useCreateDonation()
	const { updateDonation, isLoadingUpdate } = useUpdateDonation()
	const { deleteDonation, isLoadingDelete } = useDeleteDonation()

	const title = donation ? 'Edit data' : 'Create color'
	const description = donation
		? 'Change color data'
		: 'Add new color to the store'
	const action = donation ? 'Save' : 'Create'

	const form = useForm<IDonationInput>({
		mode: 'onChange',
		values: {
			amountGoal: donation?.amountGoal || 0,
			description: donation?.description || '',
		}
	})

	const onSubmit: SubmitHandler<IDonationInput> = (data) => {
		if (donation) {
		  updateDonation({ ...donation, ...data });
		} else {
		  createDonation(data);
		}
	  };
	  

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{donation && (
					<ConfirmModal handleClick={() => deleteDonation()}>
						<Button
							size='icon'
							variant='primary'
							disabled={isLoadingDelete}
						>
							<Trash className='size-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='description'
							rules={{
								required: 'Name is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder='Description'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='amountGoal'
							rules={{
								required: 'The value is mandatory'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											placeholder='Meaning of price'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						variant='primary'
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}
