import { Body, Controller, HttpCode, Inject, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '~core/pipes/zod-validation.pipe';
import { TRANSLATOR } from '~translation/application/constants/translator.constant';
import { TranslationResult } from '~translation/application/interfaces/translation-result.interface';
import { Translator } from '~translation/application/interfaces/translator.interface';
import { TranslateTextDto, translateTextSchema } from './dtos/translate-text.dto';

@ApiTags('Translator')
@Controller('translator')
export class TranslatorController {
  constructor(@Inject(TRANSLATOR) private translatorService: Translator) {}

  @ApiBody({
    description: 'An intance of TranslatTextDto',
    required: true,
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'text to be translated',
        },
        srcLanguageCode: {
          type: 'string',
          description: 'source language code',
          enum: ['en', 'es', 'zh-Hans', 'zh-Hant', 'vi', 'ja'],
        },
        targetLanguageCode: {
          type: 'string',
          description: 'target language code',
          enum: ['en', 'es', 'zh-Hans', 'zh-Hant', 'vi', 'ja'],
        },
      },
    },
    examples: {
      greeting: {
        value: {
          text: 'Good morning, good afternoon, good evening.',
          srcLanguageCode: 'en',
          targetLanguageCode: 'es',
        },
      },
      hello: {
        value: {
          text: 'Hola. Como estas?',
          srcLanguageCode: 'es',
          targetLanguageCode: 'en',
        },
      },
    },
  })
  @ApiResponse({
    description: 'The translated text',
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'translated text' },
      },
    },
    status: 200,
  })
  @HttpCode(200)
  @Post()
  @UsePipes(new ZodValidationPipe(translateTextSchema))
  translate(@Body() dto: TranslateTextDto): Promise<TranslationResult> {
    return this.translatorService.translate(dto);
  }
}
