const initialState = {
  uid: '',
  githubId: '',
  displayName: 'unknown',
  screenName: 'unknown',
  photoURL: '',
  averageStats: {},
  auth: {},
};

// Actions
export const SET_USER = "SET_USER";

export const setUser = userData => ({
  type: SET_USER,
  userData
});

// Reducer
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.userData,
      };
    default:
      return state;
  }
};
