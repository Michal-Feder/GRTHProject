import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the attendanceRegistration state domain
 */

const selectAttendanceRegistrationDomain = state =>
  state.attendanceRegistration || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AttendanceRegistration
 */

const makeSelectAttendanceRegistration = () =>
  createSelector(
    selectAttendanceRegistrationDomain,
    substate => substate,
  );

export default makeSelectAttendanceRegistration;
export { selectAttendanceRegistrationDomain };
