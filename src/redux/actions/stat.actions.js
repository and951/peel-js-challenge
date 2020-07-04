
// ========================================================================================
/*                                                                                      *
 * ACTION: Stat Actions                                                                  *
 *                                                                                      */
// ========================================================================================
import statsService from '@services/stats.services'
import {popStack} from './stack.actions'
import {AMOUNT_PER_FETCH,RETRY_CODES,DEFAULT_RETRY_BACKOFF} from '@constants/'
import createLoadingStat from '@util/createLoadingStat.util'

export const FETCH_STATS_PENDING = 'FETCH_STATS_PENDING';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_ERROR = 'FETCH_STATS_ERROR';
export const REPLACE_LOADING_STATS = 'REPLACE_LOADING_STATS';


export function fetchStatsPending() {
    return {
        type: FETCH_STATS_PENDING
    }
}

export function fetchStatsSuccess({count,next_cursor,results}) {
    return {
        type: FETCH_STATS_SUCCESS,
        count : count,
        next_cursor: next_cursor,
        data : results.all
    }
}

export function replaceLodingStats({next_cursor,results}) {
    console.log(REPLACE_LOADING_STATS,next_cursor,results)
    return {
        type: REPLACE_LOADING_STATS,
        next_cursor: next_cursor,
        data : results.all
    }
}

export function fetchStatsError(error) {
    return {
        type: FETCH_STATS_ERROR,
        error: error
    }
}


export function fetchStat(next_cursor,retries=0,backoff=DEFAULT_RETRY_BACKOFF) {
    return async (dispatch)=>{
        try{
            const res = await statsService(next_cursor)
            if(res.error) {
              throw (res.error)
            }
            else if(retries>0) {
                dispatch(replaceLodingStats(res));
                dispatch(popStack(next_cursor-AMOUNT_PER_FETCH))
            }
            else{
                dispatch(fetchStatsSuccess(res));
                dispatch(popStack(next_cursor-AMOUNT_PER_FETCH))
            }
           
            return res
        }
        catch(error) {
            const {response} = error
            if (response && response.status && RETRY_CODES.includes(response.status)){
                if(retries===0) {
                    const loadingStat = createLoadingStat(AMOUNT_PER_FETCH,next_cursor)
                    dispatch(fetchStatsSuccess(loadingStat));
                    dispatch(fetchStatsError(error));
                }
                    setTimeout(() => {
                        dispatch(fetchStat(next_cursor,retries+1,backoff))
                      }, backoff)
                }
            
            return error
        }
    }
   
}