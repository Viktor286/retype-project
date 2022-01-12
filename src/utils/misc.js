export const millisecondsToTime = ms => {
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

export const jsonObjCopy = obj => JSON.parse(JSON.stringify(obj));

export const logLocalStorageStat = () => {
  console.log("------ LocalStorageStat ------");
  let _lsTotal = 0,
    _xLen,
    _x;
  for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
      continue;
    }
    _xLen = (localStorage[_x].length + _x.length) * 2;
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
  }
  console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
};

export const debugLog = (...args) => {
  const [log, ...params] = args;
  const { event, color } = log;

  const logOutput = params => {
    if (window.debugLogConfig[event]) {
      console.log(`%c[${event}]`, `color: ${color}`, ...params);
    }
  };

  logOutput(params);
};
