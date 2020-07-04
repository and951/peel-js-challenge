// ========================================================================================
/*                                                                                      *
 * ACTION: stack actions                                                                 *
 *                                                                                      */
// ========================================================================================
import statsService from '@services/stats.services'
import createCounter from '@util/createCounter.util'
import {AMOUNT_PER_FETCH,CLIENT_LOAD_AMOUNT} from '@constants/'

export const PUSH_STACK_SUCCESS = 'PUSH_STACK_SUCCESSS';
export const POP_STACK = 'POP_STACK';
export const PUSH_STACK_ERROR = 'PUSH_STACK_ERROR';
export const CLEAN_STACK_ERROR = 'CLEAN_STACK_ERROR'


export function pushStackSuccess(stat) {
    return {
        type: PUSH_STACK_SUCCESS,
        stat: stat
    }
}
export function pushStackError(error) {
    return {
        type: PUSH_STACK_ERROR,
        error: error
    }
}
export function cleanStackError() {
    return {
        type: CLEAN_STACK_ERROR,
    }
}
export function popStack(key) {
    return {
        type: POP_STACK,
        key : key
    }
}

export function fetchStatToStack(actualCursor) {
    return async (dispatch)=>{
        try{
            const res = await statsService(actualCursor)
            if(res.error) {
                throw(res.error);
            }
            dispatch(popStack(actualCursor))
            dispatch(pushStackSuccess({actual_cursor:actualCursor,res:res}));
        }
        catch(error) {
            const errorCode =  (error.response && error.response.status) || 500
            const errorObj = {actual_cursor:actualCursor,errorMsg:errorCode}

            dispatch(pushStackError(errorObj))
        }
    }
}

export function retryErrors (errors){
    return async (dispatch)=>{
    dispatch(cleanStackError())
    Promise.all(
        Object.keys(errors).map( async (actualCursor)=>{
            dispatch(fetchStatToStack(actualCursor))
    }))
}
}

export function loadMore(stackCursor){
    return async (dispatch)=>{
        const cursors = createCounter(AMOUNT_PER_FETCH,stackCursor+CLIENT_LOAD_AMOUNT,stackCursor)
        await Promise.all(
            cursors.map(async (actualCursor)=>{
                dispatch(fetchStatToStack(actualCursor))
            })
        )
    }
}


