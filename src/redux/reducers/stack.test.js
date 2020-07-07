import { stackReducer } from './stack.reducer';

describe('stat Reducer', () => {
  const initialState = {
    stack_cursor: 0,
    error: {},
    retryError: {},
    success: {},
  };

  it('returns the initial state correctly', () => {
    const reducer = stackReducer(undefined, {});
    console.log('Reducer', reducer);
    expect(reducer).toEqual(initialState);
  });
  it('handles HYDRATE as expected', () => {
    const reducer = stackReducer(initialState, {
      type: '__NEXT_REDUX_WRAPPER_HYDRATE__',
      payload: {
        stack: {
          stack_cursor: 210,
          error: {},
          retryError: {},
          success: {
            '0': {
              count: 10,
              results: {
                all: [
                  {
                    ds: '2020-07-04',
                    y: 34205.81,
                  },
                  {
                    ds: '2020-07-03',
                    y: 32045.97,
                  },
                  {
                    ds: '2020-07-02',
                    y: 34997.17,
                  },
                  {
                    ds: '2020-07-01',
                    y: 29377.75,
                  },
                  {
                    ds: '2020-06-30',
                    y: 31291.1,
                  },
                  {
                    ds: '2020-06-29',
                    y: 21622.46,
                  },
                  {
                    ds: '2020-06-28',
                    y: 34424.17,
                  },
                  {
                    ds: '2020-06-27',
                    y: 27035.48,
                  },
                  {
                    ds: '2020-06-26',
                    y: 33209.33,
                  },
                  {
                    ds: '2020-06-25',
                    y: 33687.39,
                  },
                ],
              },
              next_cursor: 10,
            },
          },
        },
      },
    });

    expect(reducer).toEqual({
      stack_cursor: 210,
      error: {},
      retryError: {},
      success: {
        '0': {
          count: 10,
          results: {
            all: [
              {
                ds: '2020-07-04',
                y: 34205.81,
              },
              {
                ds: '2020-07-03',
                y: 32045.97,
              },
              {
                ds: '2020-07-02',
                y: 34997.17,
              },
              {
                ds: '2020-07-01',
                y: 29377.75,
              },
              {
                ds: '2020-06-30',
                y: 31291.1,
              },
              {
                ds: '2020-06-29',
                y: 21622.46,
              },
              {
                ds: '2020-06-28',
                y: 34424.17,
              },
              {
                ds: '2020-06-27',
                y: 27035.48,
              },
              {
                ds: '2020-06-26',
                y: 33209.33,
              },
              {
                ds: '2020-06-25',
                y: 33687.39,
              },
            ],
          },
          next_cursor: 10,
        },
      },
    });
  });
  it('handles PUSH_STACK_SUCCESS as expected', () => {
    const reducer = stackReducer(initialState, 
    {
        type: 'PUSH_STACK_SUCCESS',
        payload: {
          stat: {
            next_cursor: 250,
          },
        },
      });
    expect(reducer).toEqual({
      stack_cursor: 250,
      error: {},
      retryError: {},
      success: {
        240: {
          next_cursor: 250,
        },
      },
    });
  });
  it('handles PUSH_STACK_ERROR as expected', () => {
    const reducer = stackReducer(initialState, 
    {
        type: 'PUSH_STACK_ERROR',
        payload: {
          error: {
            next_cursor: 250,
          },
        },
      });
    expect(reducer).toEqual({
      stack_cursor: 250,
      error: {
        240: {
          next_cursor: 250,
        },
      },
      retryError: {},
      success: {},
    });
  });
  it('handles PUSH_STACK_RETRY_ERROR as expected', () => {
    const reducer = stackReducer(initialState, 
    {
        type: 'PUSH_STACK_RETRY_ERROR',
        payload: {
          error: {
            next_cursor: 250,
          },
        },
      });
    expect(reducer).toEqual({
      stack_cursor: 250,
      error: {},
      retryError: {
        240: {
          next_cursor: 250,
        },
      },
      success: {},
    });
  });
  it('handles POP_STACK as expected', () => {
    const reducer = stackReducer({
      stack_cursor: 250,
      error: {},
      retryError: {
        240: {
          next_cursor: 250,
        },
      },
      success: {},
    }, 
    {
        type: 'POP_STACK',
        payload: {
          key : 240,
        },
      });
    expect(reducer).toEqual({
      stack_cursor: 250,
      error: {},
      retryError: {
      },
      success: {},
    });
  });
  it('handles CLEAN_STACK_ERROR as expected', () => {
    const reducer = stackReducer({
      stack_cursor: 250,
      error: {
        240: {
          next_cursor: 250,
        },
      },
      retryError: {
       
      },
      success: {},
    }, 
    {
        type: 'CLEAN_STACK_ERROR',
        payload: {
        },
      });
    expect(reducer).toEqual({
      stack_cursor: 250,
      error: {},
      retryError: {},
      success: {},
    });
  });
});
