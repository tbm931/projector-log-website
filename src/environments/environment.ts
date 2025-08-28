import { translationVersion } from './version';
import type { Environment } from './enviroments.interface';

export const environment: Environment = {
  production: false,
  apiBaseUrl: 'https://localhost:44396/api',
  translationVersion:'dev'
};
