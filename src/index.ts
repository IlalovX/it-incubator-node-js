import express from 'express'
import { productsRoute } from './routes/products-route'
import { usersRoute } from './routes/users-route'

export const app = express()
const PORT = 3000

app.use(express.json())

// // TEST CLEAR DATA
// app.delete('/__test__/data', (req: Request, res: Response) => {
// 	try {
// 		users = []
// 		res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
// 	} catch {
// 		res
// 			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
// 			.json({ message: 'SERVER ERROR' })
// 	}
// })

app.use('/users', usersRoute)
app.use('/products', productsRoute)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
