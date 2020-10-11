import produce from 'immer';
import {GET_CURRENT_TODAY_ATTENDANCE_OF_USER_SUCCESS,GET_CURRENT_TODAY_ATTENDANCE_OF_USER_ERROR} from './constants'

export const initialState = {
  currentTodayAttendance: false,
  
};

/* eslint-disable default-case, no-param-reassign */
const attendanceRegistrationReducer = (state = initialState, action) =>
  produce(state, ( draft ) => {
    switch (action.type) {
      case GET_CURRENT_TODAY_ATTENDANCE_OF_USER_SUCCESS:
        draft.currentTodayAttendance=action.attendance;
        break;
      case GET_CURRENT_TODAY_ATTENDANCE_OF_USER_ERROR:
        draft.currentTodayAttendance=false
        break;  
      default:
        break;
    }
  });

export default attendanceRegistrationReducer;
