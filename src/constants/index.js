
// ========================================================================================
/*                                                                                      *
 * CONSTANTS: INDEX                                                                        *
 *                                                                                      */
// ========================================================================================

export const  INITIAL_STATS_AMOUNT = 200
export const CLIENT_LOAD_AMOUNT = 50
export const  AMOUNT_PER_FETCH = 10
export const RETRY_CODES = [429, 408, 500, 502, 503, 504, 522, 524]
export const DEFAULT_RETRY_BACKOFF = 1

//This field should've come from BE
export const TOTAL_AMOUNT_OF_STATS = 2500

//Redux actions constants

export const PUSH_STACK_SUCCESS = 'PUSH_STACK_SUCCESS';
export const POP_STACK = 'POP_STACK';
export const PUSH_STACK_ERROR = 'PUSH_STACK_ERROR';
export const PUSH_STACK_RETRY_ERROR = 'PUSH_STACK_RETRY_ERROR';
export const CLEAN_STACK_ERROR = 'CLEAN_STACK_ERROR';
