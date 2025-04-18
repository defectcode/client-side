export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
    crowdfunding: () => PUBLIC_URL.root('/wishlist'),
	auth: () => PUBLIC_URL.root('/auth'),
	explorer: (query = '') => PUBLIC_URL.root(`/explorer${query}`),

	product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
	category: (id = '') => PUBLIC_URL.root(`/category/${id}`),
	checkout: () => PUBLIC_URL.root('/checkout'),

	about: () => PUBLIC_URL.root('/about'),
	shop: () => PUBLIC_URL.root('/shop'),
    catalog: () => PUBLIC_URL.root('/explorer'),
    preOrder: () => PUBLIC_URL.root('/pre-order')
}

export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard${url ? url : ''}`,

	home: () => DASHBOARD_URL.root('/'),
	favorites: () => DASHBOARD_URL.root('/favorites'),
}

export const STORE_URL = {
    root: (url = '') => `/admin/store${url ? url : ''}`,

    home: (storeId = '') => STORE_URL.root(`/${storeId}`),

    products: (storeId = '') => STORE_URL.root(`/${storeId}/products`),
    productCreate: (storeId = '') => STORE_URL.root(`/${storeId}/products/create`),
    productEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/products/${id}`),

    categories: (storeId = '') => STORE_URL.root(`/${storeId}/categories`),
    categoryCreate: (storeId = '') => STORE_URL.root(`/${storeId}/categories/create`),
    categoryEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/categories/${id}`),

    colors: (storeId = '') => STORE_URL.root(`/${storeId}/colors`),
    colorCreate: (storeId = '') => STORE_URL.root(`/${storeId}/colors/create`),
    colorEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/colors/${id}`),

    wishlists: (storeId = '') => STORE_URL.root(`/${storeId}/wishlists`),
    wishlistCreate: (storeId = '') => STORE_URL.root(`/${storeId}/wishlists/create`),
    wishlistEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/wishlists/${id}`),

    donations: (storeId = '') => STORE_URL.root(`/${storeId}/donations`),
    donationCreate: (storeId = '') => STORE_URL.root(`/${storeId}/donations/create`),
    donationEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/donations/${id}`),

    reviews: (storeId = '') => STORE_URL.root(`/${storeId}/reviews`),
    settings: (storeId = '') => STORE_URL.root(`/${storeId}/settings`)
};


export const CAREER_URL = {
    root: (url = '') => `/career`,
    position: (postionId = '') => CAREER_URL.root(`/${postionId}`)
}