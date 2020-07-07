import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  pushStackSuccess,
  pushStackError,
  pushStackRetryError,
  fetchStatToStack,
  retryErrors,
  cleanStackError,
  popStack
} from '@actions';
import {  PUSH_STACK_SUCCESS,
  PUSH_STACK_ERROR,
  CLEAN_STACK_ERROR,
  POP_STACK,
  PUSH_STACK_RETRY_ERROR} from '@constants/'
import { createCounter } from '@util/';
import { bulkyFetch } from './stack.actions';

const mockStore = configureMockStore([thunk]);
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    ENV: 'dev',
    REACT_APP_ROOT: {
      dev: 'https://app.peelinsights.com/api',
    },
  },
}));

describe('Stack Actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      stack: {
        stack_cursor: 0,
        error: {},
        retryError: {},
        success: {},
      },
    });
  });
  describe('pushStackSuccess action creator', () => {
    it('dispatches PUSH_STACK_SUCCESS action and returns data on success', async () => {
      const res = {
        count: 10,
        results: {
          all: [
            {
              ds: '2016-10-31',
              y: 2196.66,
            },
            {
              ds: '2016-10-30',
              y: 2283.57,
            },
            {
              ds: '2016-10-29',
              y: 3029.75,
            },
            {
              ds: '2016-10-28',
              y: 2787.28,
            },
            {
              ds: '2016-10-27',
              y: 2426.11,
            },
            {
              ds: '2016-10-26',
              y: 2442.1,
            },
            {
              ds: '2016-10-25',
              y: 2251.27,
            },
            {
              ds: '2016-10-24',
              y: 2088.23,
            },
            {
              ds: '2016-10-23',
              y: 1939.43,
            },
            {
              ds: '2016-10-22',
              y: 1922.56,
            },
          ],
        },
        next_cursor: 1350,
      };
      await store.dispatch(pushStackSuccess(res));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(PUSH_STACK_SUCCESS);
      expect(actions[0].payload.stat.next_cursor).toEqual(1350);
    });
  });
  describe('pushStackErrpr action creator', () => {
    it('dispatches PUSH_STACK_ERROR action and returns data on success', async () => {
      const error = {
        next_cursor: 300,
        error:
          '{"stack":"TypeError: Cannot read property \'data\' of undefined\n at __webpack_exports__.default (webpack-internal:///./src/services/stats.services.js:13:21)\n at async eval (webpack-internal:///./src/redux/actions/stack.actions.js:75:19)","message":"Cannot read property \'data\' of undefined"}',
      };

      await store.dispatch(pushStackError(error));
      const actions = store.getActions();
      expect.assertions(2);
      expect(actions[0].type).toEqual(PUSH_STACK_ERROR);
      expect(actions[0].payload.error.next_cursor).toEqual(300);
    });
  });
  describe('pushStackRetryError action creator', () => {
    it('dispatches PUSH_STACK_RETRY_ERROR action and returns data on success', async () => {
      const error = {
        next_cursor: 300,
        error:
          '{"stack":"TypeError: Cannot read property \'data\' of undefined\n at __webpack_exports__.default (webpack-internal:///./src/services/stats.services.js:13:21)\n at async eval (webpack-internal:///./src/redux/actions/stack.actions.js:75:19)","message":"Cannot read property \'data\' of undefined"}',
      };

      await store.dispatch(pushStackRetryError(error));
      const actions = store.getActions();
      expect.assertions(2);
      expect(actions[0].type).toEqual(PUSH_STACK_RETRY_ERROR);
      expect(actions[0].payload.error.next_cursor).toEqual(300);
    });
  });
  describe('cleanStackError action creator', () => {
    it('dispatches CLEAN_STACK_ERROR action and returns data on success', async () => {
      await store.dispatch(cleanStackError());
      const actions = store.getActions();
      expect.assertions(1);
      expect(actions[0].type).toEqual(CLEAN_STACK_ERROR);
    });
  });
  describe('popStack action creator', () => {
    it('dispatches POP_STACK action and returns data on success', async () => {
      await store.dispatch(popStack(300));
      const actions = store.getActions();
      expect.assertions(2);
      expect(actions[0].type).toEqual(POP_STACK);
      expect(actions[0].payload.key).toEqual(300);
    });
  });
});
