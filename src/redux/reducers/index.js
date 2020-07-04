// ========================================================================================
/*                                                                                      *
 * REDUCER: INDEX                                                                        *
 *                                                                                      */
// ========================================================================================

import {combineReducers} from 'redux';
import {statsReducer} from './stats.reducer';
import {stackReducer} from './stack.reducer';


const rootReducer = combineReducers({
    stats:statsReducer,
    stack: stackReducer
});

export default rootReducer;
