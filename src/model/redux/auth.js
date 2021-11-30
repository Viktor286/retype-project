const initialState = {
  user: 'unknown',
};

// Actions
export const SET_USER = "SET_USER";

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

// Reducer
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
