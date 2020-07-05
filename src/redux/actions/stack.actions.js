// ========================================================================================
/*                                                                                      *
 * ACTION: stack actions                                                                 *
 *                                                                                      */
// ========================================================================================
import statsService from '@services/stats.services';

export const PUSH_STACK_SUCCESS = 'PUSH_STACK_SUCCESSS';
export const POP_STACK = 'POP_STACK';
export const PUSH_STACK_ERROR = 'PUSH_STACK_ERROR';
export const PUSH_STACK_RETRY_ERROR = 'PUSH_STACK_RETRY_ERROR';
export const CLEAN_STACK_ERROR = 'CLEAN_STACK_ERROR';

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

export function fetchStatToStack(next_cursor) {
  return async (dispatch) => {
    try {
      const res = await statsService(next_cursor);
      if (res.error) {
        throw res.error;
      }
      dispatch(pushStackSuccess(res));
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
      return error;
    }
  };
}

export function retryErrors(errors) {
  return async (dispatch) => {
    dispatch(cleanStackError());
    Promise.all(
      Object.keys(errors).map(async (actualCursor) => {
        dispatch(fetchStatToStack(actualCursor));
      })
    );
  };
}

export function bulkyFetch(cursors) {
  return (dispatch) => {
    Promise.all(
      cursors.map(async (actualCursor) => {
        dispatch(fetchStatToStack(actualCursor));
      })
    );
  };
}
