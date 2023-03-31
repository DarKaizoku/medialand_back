import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { AuteursModule } from 'src/auteurs/auteurs.module';
import { AuteursService } from 'src/auteurs/auteurs.service';

describe('Auteurs', () => {
	let app: INestApplication;
	let auteursServices = { findAll: () => ['test'] };

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AuteursModule],
		})
			.overrideProvider(AuteursService)
			.useValue(auteursServices)
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it(`/(GET) auteurs`, () => {
		return request(app.getHttpServer())
			.get('/auteurs')
			.expect(200)
			.expect({
				data: auteursServices.findAll(),
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
