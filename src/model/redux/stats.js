const initialState = {
  staleTimeout: 999,
  elapsedSeconds: 0,
};

export const ST_PER_SEC_UPDATE = 'ST_PER_SEC_UPDATE';
export const ST_RESET_STALE = 'ST_RESET_STALE';
export const ST_SET_STALE = 'ST_SET_STALE';

export const perSecondUpdate = () => ({
  type: ST_PER_SEC_UPDATE,
});

export const setStaleTimeout = (amount = 1) => ({
  type: ST_SET_STALE,
  amount,
});

export const resetStaleTimeout = () => ({
  type: ST_RESET_STALE,
});

export const updateSecondStat = ({ seconds, cpm, wpm }) => ({
  type: ST_PER_SEC_UPDATE,
  seconds,
  cpm,
  wpm,
});

// Reducer
export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ST_PER_SEC_UPDATE: {
      const { cpm, wpm, seconds } = action;
      return {
        ...state,
        elapsedSeconds: seconds,
        staleTimeout: state.staleTimeout + 1,
        cpm,
        wpm,
      };
    }

    case ST_SET_STALE: {
      return {
        ...state,
        staleTimeout: action.amount,
      };
    }

    case ST_RESET_STALE: {
      return {
        ...state,
        staleTimeout: 0,
      };
    }

    default:
      return state;
  }
};
