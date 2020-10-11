import { GET_ATTENDANCES_BY_ID_SUCCESS,GET_ATTENDANCES_BY_ID } from './constants';

export function getAttendancesById(userId) {
  return {
    type: GET_ATTENDANCES_BY_ID,
    userId
  };
}
export function getAttendancesByIdSuccess(attendances) {
  return {
    type: GET_ATTENDANCES_BY_ID_SUCCESS,
    attendances
  };
}
