import axios from "axios";
import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { actionTypes, authAdmin, setUserInfo } from "./actions";

function* runClockSaga() {
  yield take(actionTypes.START_CLOCK);
  while (true) {
    yield put(tickClock(false));
    yield delay(1000);
  }
}

function* rootSaga() {
  // yield takeEvery(actionTypes.LOGOUT, logout);
  // yield takeEvery(actionTypes.LOGIN, login);
}

export default rootSaga;
