import { createAction, handleActions } from "redux-actions";
import {
  delay,
  put,
  takeEvery,
  takeLatest,
  select,
  throttle,
} from "redux-saga/effects";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// undefined 를 넣어서 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 해줌
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // delay : 기다리는 함수
  yield put(increase()); // put : dispatch 하는 함수
  // select : saga 내부의 현재 상태를 조회하는 함수
  const number = yield select((state) => state.counter);
  console.log(`current value : ${number}`);
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  // takeEvery : 들어오는 모든 액션에 대해 특정 작업을 처리하는 함수
  //yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // throttle : 원하는 시간에 한번만 호출하는 함수
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  // takeLatest : 진행중인 작업이 있다면 취소하고 마지막 작업만 수행하는 함수
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
