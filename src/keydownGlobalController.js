import updateCodingAreaState from './components/CodingArea/updateCodingAreaState'

export default function keydownGlobalController({keydownEvent: e, codeTrainer}) {
  const cursor = codeTrainer.codeArea.cursorIndex;
  const currentChar = codeTrainer.currentCodeSample.contentAsArray[cursor];

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
    updateCodingAreaState({action: {type: "one-forward", cursor}, codeTrainer});
    return true;
  }

  if (e.keyCode === 37) {
    // backward
    updateCodingAreaState({action: {type: "one-backward", cursor}, codeTrainer});
    return true;
  }

  if (e.keyCode === 8) {
    // backspace
    updateCodingAreaState({action: {type: "backspace", cursor}, codeTrainer});
    return true;
  }

  if (e.keyCode === 46) {
    // delete
    updateCodingAreaState({action: {type: "delete", cursor}, codeTrainer});
    return true;
  }

  if (e.keyCode === 13 && currentChar && currentChar.charCodeAt(0) === 10) {
    // enter
    updateCodingAreaState({action: {type: "match", cursor}, codeTrainer});
    return true;
  }

  if (currentChar && currentChar.charCodeAt(0) === 9) {
    // if tab char is expecting
    if (e.keyCode === 9 || e.keyCode === 32) {
      // tab or space will be ok
      updateCodingAreaState({action: {type: "match", cursor}, codeTrainer});
      return true;
    }
  }

  // Detect match or mistake
  updateCodingAreaState({
    action: {
      type: e.key === currentChar ? "match" : "mistake",
      cursor
    }, codeTrainer
  });
}
