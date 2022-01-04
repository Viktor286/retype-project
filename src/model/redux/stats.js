const initialState = {
  staleTimeout: 999,
  elapsedSeconds: 0
};

export const PER_SEC_UPDATE = "PER_SEC_UPDATE";
export const RESET_STALE = "RESET_STALE";
export const SET_STALE = "SET_STALE";

export const perSecondUpdate = () => ({
  type: PER_SEC_UPDATE,
});

export const setStaleTimeout = (amount = 1) => ({
  type: SET_STALE,
  amount
});

export const resetStaleTimeout = () => ({
  type: RESET_STALE
});

export const updateSecondStat = (seconds) => ({
  type: PER_SEC_UPDATE,
  seconds
});

// Reducer
export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PER_SEC_UPDATE: {
      return {
        ...state,
        elapsedSeconds: action.seconds,
        staleTimeout: state.staleTimeout + 1
      };
    }

    case SET_STALE: {
      return {
        ...state,
        staleTimeout: action.amount
      };
    }

    case RESET_STALE: {
      return {
        ...state,
        staleTimeout: 0
      };
    }

    default:
      return state;
  }
}
