import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = config.getOrThrow<number>('APP_PORT');
  const origin = config.getOrThrow<string>('CORS_ALLOWED_ORIGINS');
  app.enableCors({
    origin: origin.includes(',') ? origin.split(',') : origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
