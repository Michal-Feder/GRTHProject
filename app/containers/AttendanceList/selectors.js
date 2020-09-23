import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the attendanceList state domain
 */

const selectAttendanceListDomain = state =>
  state.attendanceList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AttendanceList
 */

const makeSelectAttendanceList = () =>
  createSelector(
    selectAttendanceListDomain,
    substate => substate,
  );

export default makeSelectAttendanceList;
export { selectAttendanceListDomain };
