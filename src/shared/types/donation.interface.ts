


export interface IDonation {
    id: string,
    createdAt: string,
    description: string,
    amountGoal: number,
    productId: string,
    storeId: string,
}


export interface IDonationInput extends Pick<IDonation, 'amountGoal' | 'description'> {}
