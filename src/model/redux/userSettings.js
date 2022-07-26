const initialState = {
  typingMode: 1,
  fontSize: 4,
};

// todo: non-redux part, move to upcoming user settings model
export const fontSizes = [
  'fs-xxxs',
  'fs-xxs',
  'fs-xs',
  'fs-s',
  'fs-m',
  'fs-l',
  'fs-xl',
  'fs-xxl',
  'fs-xxxl',
  'fs-4xl',
];

// Actions
export const US_FONTSIZE_INCR = 'US_FONTSIZE_INCR';
export const US_FONTSIZE_DECR = 'US_FONTSIZE_DECR';
export const US_TOGGLE_TYPE_MODE = 'US_TOGGLE_TYPE_MODE';

export const fontSizeIncrease = () => ({
  type: US_FONTSIZE_INCR,
});

export const fontSizeDecrease = () => ({
  type: US_FONTSIZE_DECR,
});

export const toggleTypingMode = () => ({
  type: US_TOGGLE_TYPE_MODE,
});

// Reducer
export const userSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case US_FONTSIZE_INCR:
      const fontSizeDecr = state.fontSize + 1 > fontSizes.length - 1 ? state.fontSize : state.fontSize + 1;
      return {
        ...state,
        fontSize: fontSizeDecr,
      };
    case US_FONTSIZE_DECR:
      const fontSizeIncr = state.fontSize - 1 < 0 ? state.fontSize : state.fontSize - 1;
      return {
        ...state,
        fontSize: fontSizeIncr,
      };
    case US_TOGGLE_TYPE_MODE: {
      console.log('US_TOGGLE_TYPE_MODE', state);
      return {
        ...state,
        typingMode: state.typingMode ? 0 : 1,
      };
    }
    default:
      return state;
  }
};
