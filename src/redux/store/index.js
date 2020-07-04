// ========================================================================================
/*                                                                                      *
 * REDUCER: Store                                                                        *
 *                                                                                      */
// ========================================================================================

import {applyMiddleware,createStore} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '@reducers';
import initialState from './initialState';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { ENV } = publicRuntimeConfig;

const bindMiddleware = (middleware) => {
    if (ENV !== 'prod') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }
  

// create a makeStore function
const makeStore = context => createStore(rootReducer, initialState, bindMiddleware([thunkMiddleware]));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});