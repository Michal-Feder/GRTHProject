import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectAttendanceRegistrationDomain = state =>
  state.attendanceRegistration || initialState;

const makeSelectCurrentTodayAttendance = () =>
  createSelector(
    selectAttendanceRegistrationDomain,
    attendanceRegistrationState => attendanceRegistrationState.currentTodayAttendance,
  );

const makeSelectAttendanceRegistration = () =>
  createSelector(
    selectAttendanceRegistrationDomain,
    substate => substate,
  );

export default makeSelectAttendanceRegistration;
export { selectAttendanceRegistrationDomain ,  makeSelectCurrentTodayAttendance,
};
