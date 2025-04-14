import type { NextApiRequest, NextApiResponse } from 'next';

import { topicPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { topic } = req.query;

    // Ensure topic is a string
    if (!topic || Array.isArray(topic)) {
      return res.status(400).json({ message: 'Invalid topic' });
    }

    try {
      const videosQuery = topicPostsQuery(topic);
      const videos = await client.fetch(videosQuery);
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
