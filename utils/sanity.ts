import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // From your zouktune-backend
  dataset: 'production',
  apiVersion: '2023-01-01', // Or whatever version you're using
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Needed for writing
});
