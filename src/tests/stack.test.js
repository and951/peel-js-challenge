import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    pushStackSuccess
  } from '../redux/actions';

const mockStore = configureMockStore([thunk]);

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
  describe("pushStackSuccess action creator", () => {
    it("dispatches PUSH_STACK_SUCCESS action and returns data on success", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [{
            "count": 10,
            "results": {
                "all": [
                    {
                        "ds": "2016-10-31",
                        "y": 2196.66
                    },
                    {
                        "ds": "2016-10-30",
                        "y": 2283.57
                    },
                    {
                        "ds": "2016-10-29",
                        "y": 3029.75
                    },
                    {
                        "ds": "2016-10-28",
                        "y": 2787.28
                    },
                    {
                        "ds": "2016-10-27",
                        "y": 2426.11
                    },
                    {
                        "ds": "2016-10-26",
                        "y": 2442.1
                    },
                    {
                        "ds": "2016-10-25",
                        "y": 2251.27
                    },
                    {
                        "ds": "2016-10-24",
                        "y": 2088.23
                    },
                    {
                        "ds": "2016-10-23",
                        "y": 1939.43
                    },
                    {
                        "ds": "2016-10-22",
                        "y": 1922.56
                    }
                ]
            },
            "next_cursor": 1350
        }]
        })
      );
  
      await store.dispatch(pushStackSuccess());
      const actions = store.getActions();
      console.log(actions)
      // [ { type: "GET_USERS_PENDING" },
      //   { type: "GET_USERS_FULFILLED", payload: { data: [Array] } } 
      // ]
  
      expect.assertions(3);
      expect(actions[0].type).toEqual("GET_USERS_PENDING");
      expect(actions[1].type).toEqual("GET_USERS_FULFILLED");
      expect(actions[1].payload.data[0].name).toEqual("Vasilis");
    });
  });
});


