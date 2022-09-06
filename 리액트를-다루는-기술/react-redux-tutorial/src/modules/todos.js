import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// constants
const CHANGE_INPUT = "todos/CHANGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

// actions
export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3;
/*
export const insert = (text) => ({
  type: INSERT,
  todo:{
    id: id++,
    text,
    done: false,
  }
});
*/
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, (id) => id);

export const remove = createAction(REMOVE, (id) => id);

// reducer
const initialState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "learn redux",
      done: true,
    },
    {
      id: 2,
      text: "use react-redux",
      done: true,
    },
  ],
};

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
  },
  initialState
);

export default todos;
