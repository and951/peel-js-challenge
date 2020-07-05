import stat from './stack.reducer'
describe("stat Reducer", () => {
    const initialState = {
        stack_cursor: 0,
        error: {},
        retryError : {},
        success: {},
      };
  
    it("returns the initial state correctly", () => {
      const reducer = stat(undefined, {});
  
      expect(reducer).toEqual(initialState);
    });
  
    it("handles PUSH_STACK_SUCCESS as expected", () => {
      const reducer = stat(initialState, { type: "PUSH_STACK_SUCCESS" });
  
      expect(reducer).toEqual({
        stat: [],
        loading: true,
        error: false
      });
    });
  
    it("handles PUSH_STACK_ERROR as expected", () => {
      const reducer = stat(initialState, {
        type: "PUSH_STACK_ERROR",
        payload: {
          data: [
            {
              id: 1,
              name: "foo"
            }
          ]
        }
      });
  
      expect(reducer).toEqual({
        stat: [
          {
            id: 1,
            name: "foo"
          }
        ],
        loading: false,
        error: false
      });
    });
  });