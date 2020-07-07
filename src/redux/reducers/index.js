// ========================================================================================
/*                                                                                      *
 * REDUCER: INDEX                                                                        *
 *                                                                                      */
// ========================================================================================

import { combineReducers } from 'redux';
import { stackReducer } from './stack.reducer';

const rootReducer = combineReducers({
  stack: stackReducer,
});

export default rootReducer;
