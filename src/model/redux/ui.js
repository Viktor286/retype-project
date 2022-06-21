const initialState = {
  modalLayout: '',
  modalContent: '',
};

// Actions
export const UI_SET_MODAL = 'UI_SET_MODAL';
export const UI_UNSET_MODAL = 'UI_UNSET_MODAL';

export const setModal = (details) => ({
  type: UI_SET_MODAL,
  modalLayout: details.modalWindowComponentName,
  modalContent: details.staticModalContent,
});

export const unsetModal = () => ({
  type: UI_UNSET_MODAL,
});

// Reducer
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_SET_MODAL:
      return {
        ...state,
        modalLayout: action.modalLayout,
        modalContent: action.modalContent,
      };
    case UI_UNSET_MODAL:
      return {
        ...state,
        modalLayout: initialState.modalLayout,
        modalContent: initialState.modalContent,
      };
    default:
      return state;
  }
};
