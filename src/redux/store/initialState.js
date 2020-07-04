
// ========================================================================================
/*                                                                                      *
 * STORE: INITIAL STALE                                                                 *
 *                                                                                      */
// ========================================================================================

export default {
    stats : {  
        pending: false,
        count : 0,
        next_cursor: 0,
        data: null,
        error: null
    },
    stack: {
        stack_cursor:0,
        error : {
        },
        success : {
        }
    },
}