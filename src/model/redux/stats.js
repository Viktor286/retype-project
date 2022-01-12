const initialState = {
  staleTimeout: 999,
  elapsedSeconds: 0
};

export const ST_PER_SEC_UPDATE = "ST_PER_SEC_UPDATE";
export const ST_RESET_STALE = "ST_RESET_STALE";
export const ST_SET_STALE = "ST_SET_STALE";

export const perSecondUpdate = () => ({
  type: ST_PER_SEC_UPDATE,
});

export const setStaleTimeout = (amount = 1) => ({
  type: ST_SET_STALE,
  amount
});

export const resetStaleTimeout = () => ({
  type: ST_RESET_STALE
});

export const updateSecondStat = (seconds,correctAmount) => ({
  type: ST_PER_SEC_UPDATE,
  seconds,
  correctAmount
});

// Reducer
export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ST_PER_SEC_UPDATE: {
      const {correctAmount, seconds} = action;
      const cpm = correctAmount > 0 && seconds > 0 ? Number((correctAmount / seconds) * 60).toFixed(2) : 0;
      // The average word in the English language is 4.7 characters + one quoter of spaces = 5.875
      const wpm = Number(cpm / 5.875).toFixed(2);

      return {
        ...state,
        elapsedSeconds: seconds,
        staleTimeout: state.staleTimeout + 1,
        cpm,
        wpm
      };
    }

    case ST_SET_STALE: {
      return {
        ...state,
        staleTimeout: action.amount
      };
    }

    case ST_RESET_STALE: {
      return {
        ...state,
        staleTimeout: 0
      };
    }

    default:
      return state;
  }
}
