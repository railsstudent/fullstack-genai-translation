import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { env } from '~configs/env.config';
import { validateConfig } from '~configs/validate.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.json({ limit: '1000kb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(validateConfig);
  await app.listen(env.PORT);
}
bootstrap();
