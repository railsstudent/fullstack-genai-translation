import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import express from 'express';
import { env } from '~configs/env.config';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.json({ limit: '1000kb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  app.use(helmet());
  await app.listen(env.PORT);
}
bootstrap();
