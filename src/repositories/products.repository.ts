import { products } from '../db/db'
import { Product } from '../types/products.types'

export const productRepository = {
	findProducts(title: string): Product[] {
		if (title) {
			const search = title?.toLowerCase()
			const foundedProducts = products.filter(product =>
				product.title.toLowerCase().includes(search)
			)
			return foundedProducts
		}
		return products
	},
	findProductById(id: string): Product | null {
		const productId = +id
		const product = products.find(p => p.id === productId)
		if (!product) {
			return null
		}
		return product
	},
	createProduct(title: string): Product {
		const newProduct = { id: +new Date(), title }
		products.push(newProduct)
		return newProduct
	},
	updateProduct(id: string, title: string): Product | null {
		const productId = +id
		const product = products.find(p => p.id === productId)
		if (!product) return null
		product.title = title
		return product
	},
	deleteProduct(id: string): Boolean {
		const productId = +id
		const index = products.findIndex(p => p.id === productId)
		if (index !== -1) {
			products.splice(index, 1)
			return true
		}
		return false
	},
}
