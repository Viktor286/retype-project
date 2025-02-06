import { setCharBubble } from '../../model/redux/events';

export function charBubbleEventHandler(
  correctAmount,
  mistakes,
  lastCorrectAmount,
  lastMistakesAmount,
  charBubble,
  dispatch,
) {
  const newCorrectDiff = correctAmount - lastCorrectAmount;
  if (newCorrectDiff >= 6 && mistakes === lastMistakesAmount) {
    if (charBubble.length === 0 || parseInt(charBubble, 10) < newCorrectDiff) {
      dispatch(setCharBubble(`${newCorrectDiff}`));
      setTimeout(() => {
        dispatch(setCharBubble(``));
      }, 5000);
    }
  }
}
