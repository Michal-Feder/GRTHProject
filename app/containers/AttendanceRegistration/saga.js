import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_CURRENT_TODAY_ATTENDANCE_OF_USER,ADD_ATTENDANCE,UPDATE_ATTENDANCE
} from './constants';

import {
  getCurrentToadayAttendanceOfUserSuccess,getCurrentToadayAttendanceOfUser,
  getCurrentToadayAttendanceOfUsersError
} from './actions';

const baseUrl = '/api';

export function* getCurrentTodayAttendance(action) {
  const requestURL = `${baseUrl}/getCurrentTodayAttendance/${action.userId}`;
  try{
    const currentTodayAttendance = yield call(request, requestURL);
    yield put(getCurrentToadayAttendanceOfUserSuccess(currentTodayAttendance));

  }
  catch(err){
    yield put(getCurrentToadayAttendanceOfUsersError());
  }
}

export function* update(action) {
  const requestURL = `${baseUrl}/update`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.attendance),
  };
  try {
    const attendance = yield call(request, requestURL, options);
    yield put(getCurrentToadayAttendanceOfUser(attendance.userId));
  } catch (err) {
    console.log('update-error',err);
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
    const attendance = yield call(request, requestURL, options);
    yield put(getCurrentToadayAttendanceOfUser(attendance.userId));
  } catch (err) {
    console.log('add-error',err);
  }
}


export default function* loadData() {
  yield takeEvery(GET_CURRENT_TODAY_ATTENDANCE_OF_USER, getCurrentTodayAttendance);
  yield takeEvery(UPDATE_ATTENDANCE, update);
  yield takeEvery(ADD_ATTENDANCE, add);
}
