// ========================================================================================
/*                                                                                      *
 * HOOK: FETCH STATS                                                                     *
 *                                                                                      */
// ========================================================================================

// * Lib
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * Util
import { fetchStatToStack, retryErrors, bulkyFetch } from '@actions';
import {AMOUNT_PER_FETCH,CLIENT_LOAD_AMOUNT} from '@constants/'
import {createCounter} from '@util/'
// * Styles

// * Display/UI

export default () => {
  const [requiredStatIndex, setRequiredStat] = useState(false);
  const dispatch = useDispatch();

  //Selectors to fetch data from the application store
  const success = useSelector(
    (state) => state.stack.success,
    (success) => success.lenght
  );
  const errors = useSelector(
    (state) => state.stack.error,
    (error) => error.lenght
  );
  const retryError = useSelector(
    (state) => state.stack.retryError,
    (retryError) => retryError.lenght
  );
  const stackCursor = useSelector(
    (state) => state.stack.stack_cursor,
    (stack_cursor) => stack_cursor
  );
  const stat = useSelector(
    (state) => state.stack.success[requiredStatIndex],
    (stack) => stack[requiredStatIndex]
  );

  const hydrateStack = useCallback(async () => {
    const retryErrorKeys = Object.keys(retryError)
    if (!!stat) {
      dispatch(retryErrors(errors));
      const cursors = createCounter(
        AMOUNT_PER_FETCH,
        stackCursor + CLIENT_LOAD_AMOUNT,
        stackCursor
      );
      dispatch(bulkyFetch(cursors,retryErrorKeys));
      setRequiredStat(false)
    } else {
      if(!retryErrorKeys.includes(requiredStatIndex)){
        await dispatch(fetchStatToStack(requiredStatIndex));
      }
      setRequiredStat(false)
    }
  }, [dispatch, errors,stat, stackCursor,requiredStatIndex,retryErrors]);

  useEffect(() => {
    if (requiredStatIndex===0 || !!requiredStatIndex) hydrateStack();
  }, [hydrateStack,requiredStatIndex]);

  return { success, setRequiredStat };
}
