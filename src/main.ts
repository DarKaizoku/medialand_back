import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function initialize() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('MediaLand')
		.setDescription('Lister et partager vos médias préférés')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(new ValidationPipe());

	app.use(helmet());
	await app.listen(8000);
}
initialize();
