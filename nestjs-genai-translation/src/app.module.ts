import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { throttlerConfig } from '~configs/throttler.config';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [throttlerConfig, TranslationModule.register('langchain_googleChatModel')],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
