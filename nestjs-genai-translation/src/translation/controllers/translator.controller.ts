import { Controller, Get, Inject } from '@nestjs/common';
import { TRANSLATOR } from '~translation/constants/translator.constant';
import { Translator } from '~translation/interfaces/translator.interface';

@Controller('translator')
export class TranslatorController {
  constructor(@Inject(TRANSLATOR) private translatorService: Translator) {}

  @Get()
  translate(): Promise<string> {
    return this.translatorService.translate('Hello World', 'en', 'yue');
  }
}
