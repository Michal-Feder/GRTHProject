import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  UPDATE_ATTENDANCE,
  ADD_ATTENDANCE,
} from './constants';

import {
  addAttendanceSuccess,
  addAttendanceError,
  updateAttendanceError,
  updateAttendanceSuccess,
} from './action';

const baseUrl = '/api';

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
  yield takeEvery(UPDATE_ATTENDANCE, update);
  yield takeEvery(ADD_ATTENDANCE, add);
}
