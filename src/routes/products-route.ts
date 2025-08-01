import { Request, Response, Router } from 'express'
import { HTTP_STATUS } from '../constants/httpStatus'
import { productRepository } from '../repositories/products.repository'
import { Product } from '../types/products.types'

export const productsRoute = Router({})

// PRODUCTS ROUTES

productsRoute.get(
	'/products',
	(req: Request, res: Response<Product[] | { message: string }>) => {
		try {
			const foundProducts = productRepository.findProducts(
				req.query.title as string
			)
			res.json(foundProducts)
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
			const product = productRepository.findProductById(req.params.id)
			if (!product) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'Product not found' })
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

			const newProduct = productRepository.createProduct(title)
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
			if (!req.body.title) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST_400)
					.json({ message: 'Incorrect data' })
			}
			const product = productRepository.updateProduct(
				req.params.id as string,
				req.body.title
			)
			if (!product) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'Product not found' })
			}
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
			const isDeleted = productRepository.deleteProduct(req.params.id as string)
			if (!isDeleted) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'Product not found' })
			}
			res.json({ message: 'Product deleted' })
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'SERVER ERROR' })
		}
	}
)
