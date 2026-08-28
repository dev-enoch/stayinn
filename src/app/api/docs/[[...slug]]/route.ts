import { ApiReference } from '@scalar/nextjs-api-reference';

export const GET = ApiReference({
  theme: 'default',
  pageTitle: 'Stayinn API Reference',
  spec: {
    url: '/swagger.json',
  },
});
