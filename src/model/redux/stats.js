const initialState = {
  staleTimeout: 999,
  elapsedSeconds: 0,
  typingMode: 0,
};

export const ST_PER_SEC_UPDATE = 'ST_PER_SEC_UPDATE';
export const ST_RESET_STALE = 'ST_RESET_STALE';
export const ST_SET_STALE = 'ST_SET_STALE';
export const ST_TOGGLE_TYPE_MODE = 'ST_TOGGLE_TYPE_MODE';

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

export const toggleTypingMode = (currentTypingMode) => ({
  type: ST_TOGGLE_TYPE_MODE,
  currentTypingMode,
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

    case ST_TOGGLE_TYPE_MODE: {
      return {
        ...state,
        typingMode: action.currentTypingMode === 0 ? 1 : 0,
      };
    }

    default:
      return state;
  }
};
