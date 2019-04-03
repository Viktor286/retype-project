const userStatDefault = {
  todayCompleted: {
    timeCountedSum: 0,
    cpmAverage: 0,
    correctionsSum: 0,
    mistakesSum: 0,
    keysSuccessSum: 0
  },
  overallCompleted: {
    timeCountedSum: 0,
    cpmAverage: 0,
    correctionsSum: 0,
    mistakesSum: 0,
    keysSuccessSum: 0
  }
};

const userStat = (state = userStatDefault, action) => {
  switch (action.type) {
    case "INIT_USERSTAT":
      return action.collection;

    case "UPDATE_TODAY_COMPLETION":
      return { ...state, todayCompleted: action.todayCompleted };

    default:
      return state;
  }
};

export default userStat;
