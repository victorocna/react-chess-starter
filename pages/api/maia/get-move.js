import axios from 'axios';

/**
 * Next.js API route to proxy Maia Chess API requests
 * This bypasses CORS issues by making the request server-side
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { maiaElo, moveHistory, initialClock, currentClock } = req.body;

    const response = await axios.post(`${process.env.MAIA_API}/play/get_move`, moveHistory || [], {
      params: {
        maia_name: `maia_kdd_${maiaElo}`,
        initial_clock: initialClock || 0,
        current_clock: currentClock || 0,
        maia_version: 'maia2rapid',
      },
    });

    return res.status(200).json({
      move: response.data.top_move,
      delay: response.data.move_delay || 0,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to get Maia move',
      details: error.response?.data || error.message,
    });
  }
}
