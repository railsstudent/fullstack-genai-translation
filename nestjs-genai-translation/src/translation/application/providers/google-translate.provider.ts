import { v2 } from '@google-cloud/translate';
import { Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { GOOGLE_TRANSLATE } from '../constants/translator.constant';

export const GOOGLE_TRANSLATE_PROVIDER: Provider = {
  provide: GOOGLE_TRANSLATE,
  useFactory: () => new v2.Translate({ projectId: env.GOOGLE.PROJECT_ID }),
};
