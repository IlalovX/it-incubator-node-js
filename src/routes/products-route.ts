import { Request, Response, Router } from 'express'
import { HTTP_STATUS } from '../constants/httpStatus'

export const productsRoute = Router({})

type Product = {
	id: number
	title: string
}

let products: Product[] = [
	{ id: 1, title: 'Apple' },
	{ id: 2, title: 'Banana' },
]

// PRODUCTS ROUTES

productsRoute.get(
	'/products',
	(req: Request, res: Response<Product[] | { message: string }>) => {
		try {
			res.json(products)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'SERVER ERROR' })
		}
	}
)

productsRoute.get(
	'/products/:id',
	(
		req: Request<{ id: string }>,
		res: Response<Product | { message: string }>
	) => {
		try {
			const productId = parseInt(req.params.id)
			const product = products.find(item => item.id === productId)
			if (!product) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'Product Not Found' })
			}
			res.json(product)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'SERVER ERROR' })
		}
	}
)

productsRoute.post(
	'/products',
	(req: Request<{}, {}, { title: string }>, res: Response) => {
		try {
			const { title } = req.body
			if (!title) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST_400)
					.json({ message: 'TITLE IS REQUIRED' })
			}

			const newProduct: Product = { id: Date.now(), title }
			products.push(newProduct)
			res.json(newProduct)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'SERVER ERROR' })
		}
	}
)

productsRoute.put(
	'/products/:id',
	(req: Request<{ id: string }, {}, { title: string }>, res: Response) => {
		try {
			const productId = parseInt(req.params.id)
			const product = products.find(item => item.id === productId)
			if (!product) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'Product not found' })
			}
			product.title = req.body.title
			res.json(product)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'SERVER ERROR' })
		}
	}
)

productsRoute.delete(
	'/products/:id',
	(req: Request<{ id: string }>, res: Response) => {
		try {
			const productId = parseInt(req.params.id)
			products = products.filter(item => item.id !== productId)
			res.json({ message: 'Product is deleted' })
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'SERVER ERROR' })
		}
	}
)
