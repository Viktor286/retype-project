const userStatDefault = {};

const userStat = (state = userStatDefault, action) => {
  switch (action.type) {
    case "INIT_USERSTAT":
      return action.userStat;

    case "UPDATE_TODAY_COMPLETION":
      return { ...state, todayCompleted: action.todayCompleted };

    default:
      return state;
  }
};

export default userStat;
