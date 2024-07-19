import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerSetup } from './swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  swaggerSetup(app);

  await app.listen(3333);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
