import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '~core/pipes/zod-validation.pipe';
import { TRANSLATOR } from '~translation/application/constants/translator.constant';
import { TranslationResult } from '~translation/application/interfaces/translation-result.interface';
import { Translator } from '~translation/application/interfaces/translator.interface';
import { TranslateTextDto, translateTextSchema } from './dtos/translate-text.dto';

@Controller('translator')
export class TranslatorController {
  constructor(@Inject(TRANSLATOR) private translatorService: Translator) {}

  @Post()
  @UsePipes(new ZodValidationPipe(translateTextSchema))
  translate(@Body() dto: TranslateTextDto): Promise<TranslationResult> {
    return this.translatorService.translate(dto);
  }
}
