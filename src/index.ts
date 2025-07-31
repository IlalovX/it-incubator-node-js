import express, { Request, Response } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

let users = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
]

app.get('/api/users', (req: Request, res: Response) => {
	try {
		res.json(users)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
})

app.get('/api/users/:id', (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const user = users.find(u => u.id === id)
		if (!user) return res.status(404).json({ message: 'User not found' })
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
})

app.post('/api/users', (req: Request, res: Response) => {
	try {
		const { name } = req.body
		if (!name) return res.status(400).json({ message: 'Name is required' })

		const newUser = { id: +Date.now(), name }
		users.push(newUser)
		res.status(201).json(newUser)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
})

app.put('/api/users/:id', (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const { name } = req.body
		const user = users.find(u => u.id === id)

		if (!user) return res.status(404).json({ message: 'User not found' })

		user.name = name
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
})

app.delete('/api/users/:id', (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		users = users.filter(u => u.id !== id)
		res.json({ message: 'User deleted' })
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
})

let products = [
	{ id: 1, title: 'Apple' },
	{ id: 2, title: 'Banana' },
]

app.get('/api/products', (req: Request, res: Response) => {
	try {
		res.json(products)
	} catch (error) {
		res.status(500).json({ message: 'SERVER ERROR' })
	}
})

app.get('/api/products/:id', (req: Request, res: Response) => {
	try {
		const productId = parseInt(req.params.id)
		const product = products.find(item => item.id === productId)
		if (!product) return res.send(400).json({ message: 'Product Not Found' })
		res.json(product)
	} catch (error) {
		res.status(500).json({ message: 'SERVER ERROR' })
	}
})

app.post('/api/products', (req: Request, res: Response) => {
	try {
		const { title } = req.body
		if (!title) res.send(404).json({ message: 'TITLE IS REQUIRED' })
		const newProduct = { id: +new Date(), title: title }
		products.push(newProduct)
		res.json(newProduct)
	} catch (error) {
		res.status(500).json({ message: 'SERVER ERROR' })
	}
})

app.delete('/api/products/:id', (req: Request, res: Response) => {
	try {
		const productId = parseInt(req.params.id)
		products = products.filter(item => item.id !== productId)
		res.json({ message: 'Product is deleted' })
	} catch (error) {
		res.status(500).json({ message: 'SERVER ERROR' })
	}
})

app.put('/api/products/:id', (req: Request, res: Response) => {
	try {
		const productId = parseInt(req.params.id)
		const product = products.find(item => item.id === productId)
		if (!product) return res.status(404).json({ message: 'Product not found' })

		product.title = req.body.title
		res.json(product)
	} catch (error) {
		res.status(500).json({ message: 'SERVER ERROR' })
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
