import express from 'express'
import { productsRoute } from './routes/products-route'
import { usersRoute } from './routes/users-route'

export const app = express()
const PORT = 3003

app.use(express.json())
app.use('/users', usersRoute)
app.use('/products', productsRoute)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
