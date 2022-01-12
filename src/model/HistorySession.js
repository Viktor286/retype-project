export function createHistorySessionStat(statsState, correctnessState, sampleUrl, timestamp) {
  const {elapsedSeconds} = statsState;
  const {correctAmount, mistakes} = correctnessState;

  if (!elapsedSeconds || !correctAmount) {
    throw new Error("History Session Stat data isn't full");
  }

  return {
    a: Number(correctAmount), // "Number amount of correctChars"
    // w: 0, // "Number WPM"
    // c: 0, // "Number CPM"
    u: sampleUrl, // "String url"
    m: Number(mistakes), // "Number mistakes"
    s: Number(elapsedSeconds), // "Number spendTime"
    t: timestamp ? Number(timestamp) : new Date().getTime(), // "Number timestamp"
  };
}
