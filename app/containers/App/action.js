import { RESET_NAME_PASSWORD ,
  LOAD_ATTENDANCE,
  LOAD_ATTENDANCE_SUCCESS,
  LOAD_ATTENDANCE_ERROR,
  GET_ATTENDANCE,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_ERROR,
  UPDATE_ATTENDANCE,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_ERROR,
  ADD_ATTENDANCE,
  ADD_ATTENDANCE_SUCCESS,
  ADD_ATTENDANCE_ERROR,
  LOGIN_LOADED,
  LOGIN_LOADED_SUCCESS,
  LOGIN_LOADED_ERROR
} from './constants'

export function clickLogout() {
  return {
    type: RESET_NAME_PASSWORD,
  };
}
export function loadAttendances() {
  return {
    type: LOAD_ATTENDANCE,
  };
}
export function attendancesLoaded(attendances) {
  return {
    type: LOAD_ATTENDANCE_SUCCESS,
    attendances,
  };
}

export function attendanceLoadingError(error) {
  return {
    type: LOAD_ATTENDANCE_ERROR,
    error,
  };
}

// GET SPECIFIC ATTENDANCE
export function getAttendance(attendanceId) {
  return {
    type: GET_ATTENDANCE,
    attendanceId,
  };
}

export function getAttendanceSuccess(attendance) {
  return {
    type: GET_ATTENDANCE_SUCCESS,
    attendance,
  };
}

export function getAttendanceError(error) {
  return {
    type: GET_ATTENDANCE_ERROR,
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