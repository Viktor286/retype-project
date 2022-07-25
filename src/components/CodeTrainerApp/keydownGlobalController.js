import {
  CR_DELETE,
  CR_BACKSPACE,
  CR_MATCH,
  CR_MISTAKE,
  CR_ONE_FORWARD,
  CR_ONE_BACKWARD,
  updateCorrectness,
} from '../../model/redux/correctness';

import { resetStaleTimeout } from '../../model/redux/stats';

export default function keydownGlobalController({ keydownEvent: e, dispatch, store, codeSample }) {
  // Prevent keys
  if (
    e.keyCode === 9 || // prevent tab behavior
    e.keyCode === 32 || // prevent space behavior
    e.keyCode === 222 || // prevent default ' behavior (firefox quick search)
    e.keyCode === 191 // prevent default / behavior (firefox quick search)
  ) {
    e.preventDefault(); //
  }

  // Ctrl/Shift + space: page down
  if (e.keyCode === 32 && (e.ctrlKey || e.shiftKey)) {
    e.preventDefault();
    // const pageSize = parseInt(window.innerHeight, 10) - 100;
    // window.scroll(0, window.scrollY + pageSize);
    // return true;
  }

  // Bypass other Ctrl shortcut group
  if (e.ctrlKey) {
    return true;
  }

  // Skip some keys
  if (
    e.keyCode === 27 || // escape key
    e.keyCode === 38 || // up
    e.keyCode === 33 || // page up
    e.keyCode === 34 || // page down
    e.keyCode === 40 || // down
    e.keyCode === 16 || // shift
    e.keyCode === 17 || // control
    e.keyCode === 18 || // alt
    e.metaKey === true || // cmd key
    e.keyCode === 20 // caps lock
  ) {
    return true;
  }

  // Skip some key ranges
  if (e.keyCode > 112 && e.keyCode < 123) {
    // F1-F12
    return true;
  }

  // Before actionable key handled reset the staleTimeout
  dispatch(resetStaleTimeout());

  // Arrows back/forward
  if (e.keyCode === 39) {
    // forward
    dispatch(updateCorrectness(CR_ONE_FORWARD));
    return true;
  }

  if (e.keyCode === 37) {
    // backward
    dispatch(updateCorrectness(CR_ONE_BACKWARD));
    return true;
  }

  if (e.keyCode === 8) {
    // backspace
    dispatch(updateCorrectness(CR_BACKSPACE));
    return true;
  }

  if (e.keyCode === 46) {
    // delete
    dispatch(updateCorrectness(CR_DELETE));
    return true;
  }

  // Special cases with enter, tab and space
  const state = store.getState();
  const {
    correctness: { cursorIndex: cursor },
  } = state;
  const currentChar = codeSample.contentAs2dArray[cursor[0]][cursor[1]];

  if (e.keyCode === 13 && currentChar.charCodeAt(0) === 10) {
    // enter
    dispatch(updateCorrectness(CR_MATCH));
    return true;
  }

  if (currentChar && currentChar.charCodeAt(0) === 9) {
    // if tab char is expecting
    if (e.keyCode === 9 || e.keyCode === 32) {
      // tab or space will be ok
      dispatch(updateCorrectness(CR_MATCH));
      return true;
    }
  }

  // Detect match or mistake
  dispatch(updateCorrectness(e.key === currentChar ? CR_MATCH : CR_MISTAKE));
}
