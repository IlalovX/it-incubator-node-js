import request from 'supertest'
import { app } from '../..'
import { HTTP_STATUS } from '../../constants/httpStatus'

describe('/users', () => {
	beforeAll(async () => {
		await request(app).delete('/users/__test__/data')
	})
	it('should return 200 and empty array', async () => {
		await request(app).get('/users').expect(HTTP_STATUS.OK_200, [])
	})
	it('should return 404 for not existing user', async () => {
		await request(app).get('/users/4').expect(HTTP_STATUS.NOT_FOUND_404)
	})
	it('should not create user with incorrect input data', async () => {
		await request(app)
			.post('/users')
			.send({
				name: '',
			})
			.expect(HTTP_STATUS.BAD_REQUEST_400)

		await request(app).get('/users').expect(HTTP_STATUS.OK_200, [])
	})

	let createdUser: any = null
	it('should create with correct input data', async () => {
		const createResponse = await request(app)
			.post('/users')
			.send({
				name: 'test',
			})
			.expect(HTTP_STATUS.CREATED_201)

		createdUser = createResponse.body

		expect(createdUser).toEqual({
			id: expect.any(Number),
			name: 'test',
		})

		await request(app).get('/users').expect(HTTP_STATUS.OK_200, [createdUser])
	})
	it('should not update with incorrect input data', async () => {
		await request(app)
			.put('/users/' + createdUser.id)
			.send({ name: '' })
			.expect(HTTP_STATUS.BAD_REQUEST_400)

		await request(app)
			.get('/users/' + createdUser.id)
			.expect(HTTP_STATUS.OK_200, createdUser)
	})
	it('should not update which not exist', async () => {
		await request(app)
			.put('/users/' + -1)
			.send({ name: 'good test' })
			.expect(HTTP_STATUS.NOT_FOUND_404)
	})
	it('should update with correct input data', async () => {
		await request(app)
			.put('/users/' + createdUser.id)
			.send({ name: 'good test' })
			.expect(HTTP_STATUS.OK_200)

		await request(app)
			.get('/users/' + createdUser.id)
			.expect(HTTP_STATUS.OK_200, { ...createdUser, name: 'good test' })
	})
})
