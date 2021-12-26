import {
  DELETE,
  BACKSPACE,
  MATCH,
  MISTAKE,
  ONE_FORWARD,
  ONE_BACKWARD,
  updateCorrectness
} from "../../model/redux/correctness";

export default function keydownGlobalController({keydownEvent: e, dispatch, store, codeSample}) {
  // Prevent keys
  if (
    e.keyCode === 9 || // prevent tab behavior
    e.keyCode === 32 // prevent space behavior
  ) {
    e.preventDefault(); //
  }

  // Ctrl + space: page down
  if (e.keyCode === 32 && e.ctrlKey) {
    const pageSize = parseInt(window.innerHeight, 10) - 100;
    window.scroll(0, window.scrollY + pageSize);
    return true;
  }

  if (e.keyCode === 32 && e.shiftKey) {
    const pageSize = parseInt(window.innerHeight, 10) - 100;
    window.scroll(0, window.scrollY - pageSize);
    return true;
  }

  // Bypass other Ctrl shortcut group
  if (e.ctrlKey) {
    return true;
  }

  // Skip some keys
  if (
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

  // Arrows back/forward
  if (e.keyCode === 39) {
    // forward
    dispatch(updateCorrectness(ONE_FORWARD));
    return true;
  }

  if (e.keyCode === 37) {
    // backward
    dispatch(updateCorrectness(ONE_BACKWARD));
    return true;
  }

  if (e.keyCode === 8) {
    // backspace
    dispatch(updateCorrectness(BACKSPACE));
    return true;
  }

  if (e.keyCode === 46) {
    // delete
    dispatch(updateCorrectness(DELETE));
    return true;
  }

  // Special cases with enter, tab and space
  const state = store.getState();
  const {correctness: {cursorIndex: cursor}} = state;
  const currentChar = codeSample.contentAs2dArray[cursor[0]][cursor[1]];

  if (e.keyCode === 13 && currentChar.charCodeAt(0) === 10) {
    // enter
    dispatch(updateCorrectness(MATCH));
    return true;
  }

  if (currentChar && currentChar.charCodeAt(0) === 9) {
    // if tab char is expecting
    if (e.keyCode === 9 || e.keyCode === 32) {
      // tab or space will be ok
      dispatch(updateCorrectness(MATCH));
      return true;
    }
  }

  // Detect match or mistake
  dispatch(updateCorrectness(e.key === currentChar ? MATCH : MISTAKE));
}
