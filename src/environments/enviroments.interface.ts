

  export interface Environment {
    production: boolean;
    apiBaseUrl: string;
    translationVersion: any;
    paymentLinks: {
      plan_100: string;
      plan_250: string;
    };
  }
  