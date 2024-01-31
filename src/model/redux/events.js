const initialState = {
  charBubble: '',
  charBubbleReported: [],
};

// Actions
export const SET_CHAR_BUBBLE = 'SET_CHAR_BUBBLE';
export const SET_CHAR_BUBBLE_REPORTED = 'SET_CHAR_BUBBLE_REPORTED';
export const REMOVE_CHAR_BUBBLE_REPORTED = 'REMOVE_CHAR_BUBBLE_REPORTED';

export const setCharBubble = (message) => ({
  type: SET_CHAR_BUBBLE,
  message,
});

export const setCharBubbleReported = (reportedMessage) => ({
  type: SET_CHAR_BUBBLE_REPORTED,
  reportedMessage,
});

export const removeCharBubbleReported = (removeMessage) => ({
  type: REMOVE_CHAR_BUBBLE_REPORTED,
  removeMessage,
});

// Reducer
export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAR_BUBBLE:
      const { message } = action;
      return {
        ...state,
        charBubble: message,
      };
    case SET_CHAR_BUBBLE_REPORTED:
      const { reportedMessage } = action;
      const reportSet = new Set(state.charBubbleReported);
      reportSet.add(reportedMessage);
      return {
        ...state,
        charBubbleReported: Array.from(reportSet),
      };
    case REMOVE_CHAR_BUBBLE_REPORTED:
      const { removeMessage } = action;
      const removeSet = new Set(state.charBubbleReported);
      removeSet.delete(removeMessage);
      return {
        ...state,
        charBubbleReported: Array.from(removeSet),
      };
    default:
      return state;
  }
};
