import { call, put, takeLatest } from 'redux-saga/effects';
import history from 'utils/history';

import request from 'utils/request';


import { 
  LOGIN_LOADED,
} from '../App/constants';

import {
  loginLoadedSuccess,
  loginLoadedError
} from '../App/action';

const baseUrl = '/api';
export function* login(action) {
  const requestURL = `${baseUrl}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.user),
  };

  try {
    const user = yield call(request, requestURL, options);
    yield put(loginLoadedSuccess(user));
    history.push('/AttendanceRegistration');
  } catch (err) {
    yield put(loginLoadedError(err));
  }
}


export default function* loadData() {
  yield takeLatest(LOGIN_LOADED, login);
}
