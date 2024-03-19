import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '~core/pipes/zod-validation.pipe';
import { TRANSLATOR } from '~translation/constants/translator.constant';
import { TranslateTextDto, translateTextSchema } from '~translation/dtos/translate-text.dto';
import { Translator } from '~translation/interfaces/translator.interface';

@Controller('translator')
export class TranslatorController {
  constructor(@Inject(TRANSLATOR) private translatorService: Translator) {}

  @Post()
  @UsePipes(new ZodValidationPipe(translateTextSchema))
  translate(@Body() dto: TranslateTextDto): Promise<{ text: string }> {
    return this.translatorService.translate(dto);
  }
}
