import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  LOAD_ATTENDANCE,
  GET_ATTENDANCE,
  UPDATE_ATTENDANCE,
  ADD_ATTENDANCE,
} from './constants';

import {
  attendancesLoaded,
  attendanceLoadingError,
  getAttendanceSuccess,
  getAttendanceError,
  addAttendanceSuccess,
  addAttendanceError,
  updateAttendanceError,
  updateAttendanceSuccess,
} from './action';

const baseUrl = '/api';

export function* getList() {
  const requestURL = `${baseUrl}/list`;

  try {
    const list = yield call(request, requestURL);
    yield put(attendancesLoaded(list));
  } catch (err) {
    yield put(attendanceLoadingError(err));
  }
}

export function* get(action) {
  const requestURL = `${baseUrl}/get/${action.attendanceId}`;

  try {
    const attendance = yield call(request, requestURL);
    yield put(getAttendanceSuccess(attendance));
  } catch (err) {
    yield put(getAttendanceError(err));
  }
}

export function* update(action) {
  const requestURL = `${baseUrl}/update`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.attendance),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(updateAttendanceSuccess(action.attendance, list));
  } catch (err) {
    yield put(updateAttendanceError(err));
  }
}

export function* add(action) {
  const requestURL = `${baseUrl}/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.attendance),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(addAttendanceSuccess(action.attendance, list));
  } catch (err) {
    yield put(addAttendanceError(err));
  }
}


export default function* loadData() {
  yield takeLatest(LOAD_ATTENDANCE, getList);
  yield takeEvery(GET_ATTENDANCE, get);
  yield takeEvery(UPDATE_ATTENDANCE, update);
  yield takeEvery(ADD_ATTENDANCE, add);
}
