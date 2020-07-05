// ========================================================================================
/*                                                                                      *
 * REDUCER: Stack                                                                        *
 *                                                                                      */
// ========================================================================================

import { HYDRATE } from 'next-redux-wrapper';
import {
  PUSH_STACK_SUCCESS,
  PUSH_STACK_ERROR,
  PUSH_STACK_RETRY_ERROR,
  CLEAN_STACK_ERROR,
  POP_STACK,
} from '@actions';
import initialState from '@store/initialState';
import { AMOUNT_PER_FETCH } from '@constants/';

export function stackReducer(state = initialState.stack, action) {
  const actualStackCursor =
    action?.payload?.stat?.next_cursor > state.stack_cursor
      ? +action.payload?.stat.next_cursor
      : +state.stack_cursor;
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.stack };
    case PUSH_STACK_SUCCESS:
      const actualCursor = action.payload.stat.next_cursor - AMOUNT_PER_FETCH;
      return {
        ...state,
        stack_cursor: actualStackCursor,
        success: {
          ...state.success,
          [actualCursor]: action.payload.stat,
        },
      };
    case PUSH_STACK_ERROR:
      const actualErrorCursor =
        action.payload.error.next_cursor - AMOUNT_PER_FETCH;
      return {
        ...state,
        stack_cursor: actualStackCursor,
        error: {
          ...state.error,
          [actualErrorCursor]: action.payload.error,
        },
      };
    case PUSH_STACK_RETRY_ERROR:
      const actualRetryErrorCursor =
        action.payload.error.next_cursor - AMOUNT_PER_FETCH;
      return {
        ...state,
        stack_cursor: actualStackCursor,
        retryError: {
          ...state.retryError,
          [actualRetryErrorCursor]: action.payload.error,
        },
      };
    case POP_STACK:
      const { [action.payload.key]: err, ...remainingError } = state.error;
      const {
        [action.payload.key]: retryErr,
        ...remainingRetryError
      } = state.retryError;
      return { ...state, error: remainingError, retryError: remainingRetryError };
    case CLEAN_STACK_ERROR:
      return { ...state, error: {} };
    default:
      return state;
  }
}
