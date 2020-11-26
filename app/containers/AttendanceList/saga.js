import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';

import {
  GET_ATTENDANCES_BY_ID
} from './constants';

import {
  getAttendancesByIdSuccess,
  
} from './actions';

const baseUrl = '/api';

export function* get(action) {
  const requestURL = `${baseUrl}/getAttendances/${action.userId}`;
  try{
    const attendances = yield call(request, requestURL);
    yield put(getAttendancesByIdSuccess(attendances));
  }
  catch(err){  
    console.log('attendance-list-error',err);  }
}

export default function* loadData() {
  yield takeEvery(GET_ATTENDANCES_BY_ID, get);
}
