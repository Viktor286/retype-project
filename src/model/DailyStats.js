import { getTodayDateString, getCpm, getWpm } from '../utils/misc';

export function getLocalDailyStats() {
  const dailyStatsStr = window.localStorage.getItem('retypeDailyStats');
  return dailyStatsStr ? JSON.parse(dailyStatsStr) : createDailyStatsInitialState();
}

export function setLocalDailyStats(historySessionData) {
  const dailyStats = getLocalDailyStats();
  window.localStorage.setItem(
    'retypeDailyStats',
    JSON.stringify(addSessionToDailyStats(dailyStats, historySessionData)),
  );
  console.log('setLocalDailyStats', getLocalDailyStats());
}

export function addSessionToDailyStats(dailyStats, historySessionData) {
  // Reset DailyStats, keep previousDay
  if (dailyStats.today !== getTodayDateString()) {
    dailyStats = createDailyStatsInitialState({ previousDay: dailyStats.today });
  }

  const { finished, total } = dailyStats;
  const { a: correctChars, m: mistakes, s: spendTimeSec } = historySessionData;

  const newTotal = {
    timeSpent: total.timeSpent + spendTimeSec,
    chars: total.chars + correctChars,
    errs: total.errs + mistakes,
  };

  return {
    ...dailyStats,
    total: newTotal,
    average: {
      wpm: getWpm(newTotal.chars, newTotal.timeSpent),
      cpm: getCpm(newTotal.chars, newTotal.timeSpent),
      mistakesPercent: Number(newTotal.errs / (newTotal.chars / 100)).toFixed(2),
    },
    finished: [...finished, historySessionData],
  };
}

export function createDailyStatsInitialState(props = {}) {
  const newDailyStats = {
    today: getTodayDateString(),
    previousDay: getTodayDateString(),
    total: {
      timeSpent: 0,
      chars: 0,
      errs: 0,
    },
    average: {
      wpm: 0,
      cpm: 0,
    },
    finished: [],
  };

  return {
    ...newDailyStats,
    ...props,
  };
}
