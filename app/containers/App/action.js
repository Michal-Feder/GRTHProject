import {
  ADD_ATTENDANCE_SUCCESS,
  ADD_ATTENDANCE_ERROR,
  ADD_ATTENDANCE,
  UPDATE_ATTENDANCE,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_ERROR,
  LOGIN_LOADED,
  LOGIN_LOADED_SUCCESS,
  LOGIN_LOADED_ERROR,
  LOGOUT
} from './constants';

// ADD ATTENDANCE
export function addAttendance(attendance) {
  return {
    type: ADD_ATTENDANCE,
    attendance,
  };
}

export function addAttendanceSuccess(attendance, attendances) {
  return {
    type: ADD_ATTENDANCE_SUCCESS,
    attendance,
    attendances,
  };
}

export function addAttendanceError(error) {
  return {
    type: ADD_ATTENDANCE_ERROR,
    error,
  };
}
// UPDATE ATTENDANCE
export function updateAttendance(attendance) {
  return {
    type: UPDATE_ATTENDANCE,
    attendance,
  };
}

export function updateAttendanceSuccess(attendance, attendances) {
  return {
    type: UPDATE_ATTENDANCE_SUCCESS,
    attendance,
    attendances,
  };
}

export function updateAttendanceError(error) {
  return {
    type: UPDATE_ATTENDANCE_ERROR,
    error,
  };
}

export function clickLogout() {
  return {
    type: LOGOUT,
  };
}

export function loginLoaded(user) {
  return {
    type: LOGIN_LOADED,
    user
  };
}
export function loginLoadedSuccess(user) {
  return {
    type: LOGIN_LOADED_SUCCESS,
    user
  };
}
export function loginLoadedError(error) {
  return {
    type: LOGIN_LOADED_ERROR,
    error
  };
}