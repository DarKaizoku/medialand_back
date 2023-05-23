import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule =
			await Test.createTestingModule({
				imports: [AppModule],
			}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	let TOKEN: string;

	it('/auth/login (POST)', async () => {
		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				"username": process.env.userTest,
				"password": process.env.mdpTest
			})
			.expect(201)

		return TOKEN = (response.body.access_token)

	});

	it('/ (GET)', async () => {
		const response = await request(app.getHttpServer())
			.get('/supports/5')
			.set({
				Authorization: `Bearer ${TOKEN}`
			})

		expect(response.statusCode).toEqual(200)
		expect(response.body).toBeDefined()
		expect(response.body).toHaveProperty('status', 'SUCCESS')
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('data.id', 5)
		expect(response.body).toHaveProperty('data.nom', 'PS5')

	});

	afterEach(async () => {
		app.close()
	})

});
