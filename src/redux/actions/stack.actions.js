// ========================================================================================
/*                                                                                      *
 * ACTION: stack actions                                                                 *
 *                                                                                      */
// ========================================================================================
import statsService from '@services/stats.services';
import { DEFAULT_RETRY_BACKOFF } from '@constants/';
import { isSSR } from '@util/';
import {
  PUSH_STACK_SUCCESS,
  PUSH_STACK_ERROR,
  CLEAN_STACK_ERROR,
  POP_STACK,
  PUSH_STACK_RETRY_ERROR,
} from '@constants/';

export function pushStackSuccess(stat) {
  return {
    type: PUSH_STACK_SUCCESS,
    payload: {
      stat: stat,
    },
  };
}

export function pushStackError(error) {
  return {
    type: PUSH_STACK_ERROR,
    payload: {
      error: error,
    },
  };
}
export function pushStackRetryError(error) {
  return {
    type: PUSH_STACK_RETRY_ERROR,
    payload: {
      error: error,
    },
  };
}
export function cleanStackError() {
  return {
    type: CLEAN_STACK_ERROR,
  };
}
export function popStack(key) {
  return {
    type: POP_STACK,
    payload: {
      key: key,
    },
  };
}

export function fetchStatToStack(next_cursor, backoff = 0) {
  return  (dispatch) => {
    setTimeout(async () => {
      try {
        const res = await statsService(next_cursor);
        if (res.error) {
          throw res.error;
        }
        dispatch(pushStackSuccess(res));
        dispatch(popStack(next_cursor));
        return res;
      } catch (error) {
        dispatch(
          pushStackRetryError({
            ...{
              next_cursor,
              error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
            },
          })
        );
        if (!isSSR()) {
          const newBackoff =
            (error?.response?.headers['retry-after'] || 0) +
            DEFAULT_RETRY_BACKOFF;
          dispatch(fetchStatToStack(next_cursor, newBackoff * 1000));
        }
        return error;
      }
    }, backoff);
  };
}

export function retryErrors(errors) {
  return async (dispatch) => {
    dispatch(cleanStackError());
    await Promise.all(
      Object.keys(errors).map(async (actualCursor) => {
        dispatch(fetchStatToStack(actualCursor));
      })
    );
  };
}

export function bulkyFetch(cursors, retryErrors = []) {
  return async (dispatch) => {
    await Promise.all(
      cursors
        .filter((value) => !retryErrors.includes(value))
        .map(async (actualCursor) => {
          dispatch(fetchStatToStack(actualCursor));
        })
    );
  };
}
