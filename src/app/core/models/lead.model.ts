export interface LeadPayload {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    plan?: 'free' | 'pro100' | 'biz250' | 'enterprise';
    source?: string;
  }
  