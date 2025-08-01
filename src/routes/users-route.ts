import { Request, Response, Router } from 'express'
import { HTTP_STATUS } from '../constants/httpStatus'

export const usersRoute = Router({})

type User = {
	id: number
	name: string
}

export let users: User[] = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
]

// USERS ROUTES

usersRoute.get(
	'/users',
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

usersRoute.get(
	'/users/:id',
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

usersRoute.post(
	'/users',
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

usersRoute.put(
	'/users/:id',
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

usersRoute.delete(
	'/users/:id',
	(req: Request<{ id: string }>, res: Response) => {
		try {
			const id = parseInt(req.params.id)
			users = users.filter(u => u.id !== id)
			res.json({ message: 'User deleted' })
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)
