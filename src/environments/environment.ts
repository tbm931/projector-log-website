import { translationVersion } from './version';
import type { Environment } from './enviroments.interface';

export const environment: Environment = {
  production: false,
  apiBaseUrl: 'https://localhost:44396/api',
  translationVersion: 'dev',
  //צריך להחליף לקישור חי
  paymentLinks: {
    plan_100: 'https://buy.stripe.com/test_14k3fS4bK4bE7TG5kl',
    plan_250: 'https://buy.stripe.com/test_9AQdRk4bK4bE7TG5kl'
  }
};
