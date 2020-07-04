// ========================================================================================
/*                                                                                      *
 * REDUCER: Stat                                                                        *
 *                                                                                      */
// ========================================================================================

import {HYDRATE} from 'next-redux-wrapper';
import {REPLACE_LOADING_STATS, FETCH_STATS_SUCCESS, FETCH_STATS_ERROR} from '@actions';
import initialState from '@store/initialState'


export function statsReducer(state = initialState.stats, action) {
    try{
    switch(action.type) {
        case HYDRATE:
            return {...state, ...action.payload.stats};
  
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                count: state.count + action.count,
                next_cursor: action.next_cursor,
                data : state.data ? [...state.data,...action.data] : action.data
            }
        case REPLACE_LOADING_STATS:
            const leftSide = state.data.splice(0,action.next_cursor-10)
            const center = action.data
            const rightSide = state.data.splice(action.next_cursor,state.data.length)
            return {
                ...state,
                data : [...leftSide,...center,...rightSide]
            }
        case FETCH_STATS_ERROR:
            return {
                ...state,
                error: action.error
            }
        default: 
            return state;
    }
}
catch(error){
    console.log(error)
    return(state)
}
}