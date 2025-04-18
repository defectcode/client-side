import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
// import { CreateWishlist } from './create/CreateWishlist';

export const metadata: Metadata = {
  title: 'Sizes',
  ...NO_INDEX_PAGE
}

export default function WishlistPage() {
  // return <CreateWishlist />;
}
