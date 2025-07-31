import { Express } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export const setupSwagger = (app: Express) => {
	const options: swaggerJsdoc.Options = {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'My Express API',
				version: '1.0.0',
				description: 'Simple Express API with Swagger',
			},
			servers: [{ url: 'http://localhost:3000' }],
		},
		apis: ['./index.ts'], // Путь к файлу с аннотациями
	}

	const swaggerSpec = swaggerJsdoc(options)
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
