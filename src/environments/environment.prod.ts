
import { translationVersion } from './version';
import type { Environment } from './enviroments.interface';

export const environment: Environment = {
  production: true,
  apiBaseUrl: 'https://log.dev.ysprojector.co.il/api',
  translationVersion
};
