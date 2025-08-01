import { users } from '../db/db'
import { User } from '../types/users.types'

export const usersRepository = {
	findUsers(title: string): User[] {
		if (title) {
			const search = title?.toLowerCase()
			return users.filter(user => user.name.toLowerCase().includes(search))
		}
		return users
	},
	findUserById(id: string): User | null {
		const userId = +id
		const user = users.find(u => u.id === userId)
		if (!user) return null
		return user
	},
	createUser(name: string): User {
		const newUser: User = { id: Date.now(), name }
		users.push(newUser)
		return newUser
	},
	updateUser(id: string, name: string): User | null {
		const userId = +id
		const user = users.find(u => u.id === userId)
		if (!user) return null
		user.name = name
		return user
	},
	deleteUser(id: string): Boolean {
		const userId = +id
		const index = users.findIndex(u => u.id === userId)
		if (index !== -1) {
			users.splice(index, 1)
			return true
		}
		return false
	},
	clearUsersData() {
		users.length = 0
	},
}
