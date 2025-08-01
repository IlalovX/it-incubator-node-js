import { Request, Response, Router } from 'express'
import { HTTP_STATUS } from '../constants/httpStatus'
import { usersRepository } from '../repositories/users.repository'
import { User } from '../types/users.types'

export const usersRoute = Router({})

// USERS ROUTES

usersRoute.get(
	'/',
	(req: Request, res: Response<User[] | { message: string }>) => {
		try {
			const foundUsers = usersRepository.findUsers(req.query.title as string)
			res.json(foundUsers)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)

usersRoute.get(
	'/:id',
	(req: Request<{ id: string }>, res: Response<User | { message: string }>) => {
		try {
			const user = usersRepository.findUserById(req.params.id)
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
	'/',
	(req: Request<{}, {}, { name: string }>, res: Response) => {
		try {
			const { name } = req.body
			if (!name.trim()) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST_400)
					.json({ message: 'Name is required' })
			}
			const newUser = usersRepository.createUser(name)
			res.status(HTTP_STATUS.CREATED_201).json(newUser)
		} catch {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)

usersRoute.put(
	'/:id',
	(req: Request<{ id: string }, {}, { name: string }>, res: Response) => {
		const { id } = req.params
		const { name } = req.body

		if (!name || !id) {
			return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
		}

		try {
			const updatedUser = usersRepository.updateUser(id, name)

			if (!updatedUser) {
				return res
					.status(HTTP_STATUS.NOT_FOUND_404)
					.json({ message: 'User not found' })
			}

			return res.status(HTTP_STATUS.OK_200).json(updatedUser)
		} catch (error) {
			res
				.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
				.json({ message: 'Server error' })
		}
	}
)

usersRoute.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
	try {
		const isDeleted = usersRepository.deleteUser(req.params.id)
		if (!isDeleted) {
			return res
				.status(HTTP_STATUS.NOT_FOUND_404)
				.json({ message: 'User not found' })
		}
		res.json({ message: 'User deleted' })
	} catch {
		res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
			.json({ message: 'Server error' })
	}
})

usersRoute.delete('/__test__/data', (_req, res) => {
	usersRepository.clearUsersData()
	res.sendStatus(204)
})
