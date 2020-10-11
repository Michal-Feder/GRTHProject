import { END_PRESENCE, START_PRESENCE } from '../App/constants';
import {UPDATE_ATTENDANCE,ADD_ATTENDANCE,GET_CURRENT_TODAY_ATTENDANCE_OF_USER_ERROR,GET_CURRENT_TODAY_ATTENDANCE_OF_USER_SUCCESS,GET_CURRENT_TODAY_ATTENDANCE_OF_USER } from './constants';
export function clickStart(AttendanceList) {
  return {
    type: START_PRESENCE,
    AttendanceList,
  };
}
export function clickEnd(AttendanceList) {
  return {
    type: END_PRESENCE,
    AttendanceList,
  };
}

export function getCurrentToadayAttendanceOfUser(userId){
  return{
    type:GET_CURRENT_TODAY_ATTENDANCE_OF_USER,
    userId
  }
}
export function getCurrentToadayAttendanceOfUserSuccess(attendance){
  return{
    type:GET_CURRENT_TODAY_ATTENDANCE_OF_USER_SUCCESS,
    attendance
  }
}
export function getCurrentToadayAttendanceOfUsersError(){
  return{
    type:GET_CURRENT_TODAY_ATTENDANCE_OF_USER_ERROR,
  }
}
export function addAttendance(attendance) {
  return {
    type: ADD_ATTENDANCE,
    attendance,
  };
}
export function updateAttendance(attendance) {
  return {
    type: UPDATE_ATTENDANCE,
    attendance,
  };
}
