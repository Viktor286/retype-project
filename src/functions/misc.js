const millisecondsToTime = ms => {
  let seconds = ms / 1000;
  let minutes = parseInt(seconds / 60, 10);
  seconds = seconds % 60;
  let hours = parseInt(minutes / 60, 10);
  minutes = minutes % 60;

  const addLeadZeroForStr = num => {
    const n = parseInt(num, 10);
    return Math.abs(n) > 9 ? String(n) : "0" + n;
  };

  hours = addLeadZeroForStr(hours);
  minutes = addLeadZeroForStr(minutes);
  seconds = addLeadZeroForStr(seconds);

  const strHours = hours === "00" ? "" : hours + ":";

  const strMinutes = minutes === "00" && hours === "00" ? "" : minutes + ":";

  const strSeconds =
    seconds === "00" && minutes === "00" && hours === "00" ? "0" : seconds;

  return strHours + strMinutes + strSeconds;
};

const jsonObjCopy = obj => JSON.parse(JSON.stringify(obj));

export { millisecondsToTime, jsonObjCopy };
