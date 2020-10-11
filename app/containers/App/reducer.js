import produce from 'immer';

import {
  START_PRESENCE,
  END_PRESENCE,
  RESET_NAME_PASSWORD,
  LOAD_ATTENDANCE,
  LOAD_ATTENDANCE_SUCCESS,
  LOAD_ATTENDANCE_ERROR,
  GET_ATTENDANCE,
  GET_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE,
  UPDATE_ATTENDANCE_SUCCESS,
  LOGIN_LOADED,
  LOGIN_LOADED_SUCCESS,
  LOGIN_LOADED_ERROR
} from './constants';

export const initialState = {
  currentUser: false,
  error: false, 
  loading: false,
  // pages:false

};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_PRESENCE:
        draft.AttendanceList.push(action.AttendanceList);
        break;
      case END_PRESENCE:
        const index = draft.AttendanceList.findIndex
        (e => e.userName === action.AttendanceList.userName &&
                        e.userPassword === action.AttendanceList.userPassword &&
                        e.date === action.AttendanceList.date);
        draft.AttendanceList[index].end = action.AttendanceList.end;
        break;
      case RESET_NAME_PASSWORD:
        draft.error = false;
        draft.currentUser = false;
        break;
      case LOAD_ATTENDANCE:
        draft.loading = true;
        draft.error = false;
        draft.attendances = false;
        break;
      case LOAD_ATTENDANCE_SUCCESS:
        draft.attendances = action.attendances;
        draft.loading = false;
        break;
      case GET_ATTENDANCE:
        draft.loading = true;
        draft.error = false;
        draft.currentAttendance = false;
        break;
      case GET_ATTENDANCE_SUCCESS:
        draft.loading = false;
        draft.currentAttendance = action.attendance;
        break;
      case UPDATE_ATTENDANCE:
        draft.loading = true;
        draft.error = false;
        break;
      case UPDATE_ATTENDANCE_SUCCESS:
        draft.loading = false;
        draft.attendances = action.attendances;
        draft.currentAttendance = action.attendance;
        break;
      case LOAD_ATTENDANCE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOGIN_LOADED_SUCCESS:
        draft.loading = false;
        draft.error=false;
        draft.currentUser = action.user;
        break;
      case LOGIN_LOADED_ERROR:
        draft.error = 'username or password incorrect';
        draft.loading = false;
        break; 
      case LOGIN_LOADED:
        draft.loading = true;
        draft.error = false;
        break;
      default:
        break;
    }

  });

export default appReducer;