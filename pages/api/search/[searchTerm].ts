import type { NextApiRequest, NextApiResponse } from 'next';
import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query;

    // Ensure searchTerm is a string
    if (!searchTerm || Array.isArray(searchTerm)) {
      return res.status(400).json({ message: 'Invalid search term' });
    }

    try {
      const videosQuery = searchPostsQuery(searchTerm);
      const videos = await client.fetch(videosQuery);
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
