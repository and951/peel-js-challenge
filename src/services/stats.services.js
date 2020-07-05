// ========================================================================================
/*                                                                                      *
 * SERVICE: STAT                                                                        *
 *                                                                                      */
// ========================================================================================

import axios from './axios.service';



export default async (next_cursor) => {
  try {
    const response = await axios.get(`/test_stats/?cursor=${next_cursor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
