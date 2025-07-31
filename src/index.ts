import express, { Request, Response } from 'express'
import { HTTP_STATUS } from './constants/httpStatus'

export const app = express()
const PORT = 3000

app.use(express.json())

// Типы
type User = {
	id: number
	name: string
}
type Product = {
	id: number
	title: string
}

// Данные
let users: User[] = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
]

let products: Product[] = [
	{ id: 1, title: 'Apple' },
	{ id: 2, title: 'Banana' },
]

// USERS ROUTES

app.get(
	'/api/users',
	(req: Request, res: Response<User[] | { message: string }>) => {
		try {
			res.json(users)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)

app.get(
	'/api/users/:id',
	(req: Request<{ id: string }>, res: Response<User | { message: string }>) => {
		try {
			const id = parseInt(req.params.id)
			const user = users.find(u => u.id === id)
			if (!user) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'User not found' })
			}
			res.json(user)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)

app.post(
	'/api/users',
	(req: Request<{}, {}, { name: string }>, res: Response) => {
		try {
			const { name } = req.body
			if (!name) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST_400)
					.json({ message: 'Name is required' })
			}

			const newUser: User = { id: Date.now(), name }
			users.push(newUser)
			res.status(HTTP_STATUS.CREATED_201).json(newUser)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)

app.put(
	'/api/users/:id',
	(req: Request<{ id: string }, {}, { name: string }>, res: Response) => {
		const id = parseInt(req.params.id)
		const { name } = req.body
		if (!name) return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)

		try {
			const user = users.find(u => u.id === id)
			if (!user) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'User not found' })
			}
			user.name = name
			res.status(HTTP_STATUS.NO_CONTENT_204).json(user)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)

app.delete('/api/users/:id', (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		users = users.filter(u => u.id !== id)
		res.json({ message: 'User deleted' })
	} catch {
		res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
			.json({ message: 'Server error' })
	}
})

// PRODUCTS ROUTES

app.get(
	'/api/products',
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

app.get(
	'/api/products/:id',
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

app.post(
	'/api/products',
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

app.put(
	'/api/products/:id',
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

app.delete(
	'/api/products/:id',
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

// TEST CLEAR DATA
app.delete('/__test__/data', (req: Request, res: Response) => {
	try {
		users = []
		res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
	} catch {
		res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
			.json({ message: 'SERVER ERROR' })
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
