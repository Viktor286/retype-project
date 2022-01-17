const initialState = {
  uid: '',
  githubId: '',
  displayName: 'unknown',
  userName: 'unknown',
  photoURL: '',
  averageStats: {},
  auth: {},
};

// Actions
export const AU_SET_USER = "AU_SET_USER";

export const setUser = userData => ({
  type: AU_SET_USER,
  userData
});

// Reducer
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AU_SET_USER:
      return {
        ...state,
        ...action.userData,
      };
    default:
      return state;
  }
};
