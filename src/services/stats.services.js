// ========================================================================================
/*                                                                                      *
 * SERVICE: STAT                                                                        *
 *                                                                                      */
// ========================================================================================

import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { ENV, REACT_APP_ROOT } = publicRuntimeConfig;
const config = {
  crossDomain: true
}

export default async (next_cursor) => {
  try{
  const response = await axios.get(
    `${REACT_APP_ROOT[ENV]}/test_stats/?cursor=${next_cursor}`, config
  );
  return response.data;
}
catch(error){
    throw error
}
}
