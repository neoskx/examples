// Initial State
const initState = {
  counterValue: 0,
};

function reducer(state = initState, action) {
  if (typeof state === "undefined") {
    return initState;
  }

  switch (action.type) {
    case "COUNTER/INCREMENT":
      return { ...state, ...{ counterValue: state.counterValue + 1 } };
    case "COUNTER/DECREMENT":
      return { ...state, ...{ counterValue: state.counterValue - 1 } };
    default:
      return state;
  }
}

export default reducer;
