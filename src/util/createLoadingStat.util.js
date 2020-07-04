// ========================================================================================
/*                                                                                      *
 * UTIL: Create Loading                                                                 *
 *                                                                                      */
// ========================================================================================

import { LOADING_VALUE } from '@constants/'

export default (delimiter,next_cursor) => {
    return {  
        count: 10,
        results: {
            all:  Array(delimiter).fill().map((index)=>({'ds' :LOADING_VALUE , 'y':LOADING_VALUE})),
        },
        next_cursor : next_cursor+10
    }
 }
 
 