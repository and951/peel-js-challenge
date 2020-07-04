// ========================================================================================
/*                                                                                      *
 * REDUCER: Stack                                                                        *
 *                                                                                      */
// ========================================================================================

import {HYDRATE} from 'next-redux-wrapper';
import {PUSH_STACK_SUCCESS,PUSH_STACK_ERROR, CLEAN_STACK_ERROR,POP_STACK } from '@actions';
import initialState from '@store/initialState'


export function stackReducer(state = initialState.stack, action) {
   const actualStackCursor = action.stat && action.stat.actual_cursor > state.stack_cursor ? +action.stat.actual_cursor : +state.stack_cursor
    switch(action.type) {
        case HYDRATE:
            return {...state, ...action.payload.stack};
        case PUSH_STACK_SUCCESS: 
            return  {...state, 
                stack_cursor:actualStackCursor,
                success: { ...state.success, [action.stat.actual_cursor]:action.stat}
            }
        case PUSH_STACK_ERROR: 
            return  {...state, 
                stack_cursor:actualStackCursor ,
                error: { ...state.error, [action.error.actual_cursor]:action.error.errorMsg}
            }
        case POP_STACK:
            const  { [action.key]: value, ...remainingSuccess } = state.success;
            const  { [action.key]: err, ...remainingError } = state.error;
            return {...state, 
                success : remainingSuccess,
                error :remainingError
            }
        case CLEAN_STACK_ERROR : 
            return {...state, 
                error: {}
            }
        default: 
            return state;
    }
}
