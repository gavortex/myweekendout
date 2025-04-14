// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const doc = req.body;

    try {
      await client.createIfNotExists(doc);
      res.status(200).json({ message: 'User created or already exists' });
    } catch (error) {
      console.error('Sanity error:', error);
      res.status(500).json({ message: 'Error creating user in Sanity', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
