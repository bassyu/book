import { createAction, handleActions } from "redux-actions";

// constants
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// actions
/*
export const increase = () => ({ type: INCREASE });
*/
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// reducer
const initialState = {
  number: 0,
};

/*
function counter(state = initialState, action){
  switch(action.type){
    case INCREASE:
      return {
        number: state.number + 1
      };
    case DECREASE:
      return {
        number: state.number - 1
      };
    default:
      return state;
    }
  }
}
*/
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
