import { Controller, Get, Inject } from '@nestjs/common';
import { TRANSLATOR } from '~translation/constants/translator.constant';
import { Translator } from '~translation/interfaces/translator.interface';

@Controller('translator')
export class TranslatorController {
  constructor(@Inject(TRANSLATOR) private translatorService: Translator) {}

  @Get()
  translate() {
    return this.translatorService.translate('a', 'en', 'es');
  }
}
