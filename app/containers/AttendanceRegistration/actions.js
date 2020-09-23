/*
 *
 * AttendanceRegistration actions
 *
 */


import { END_PRESENCE, START_PRESENCE } from '../App/constants';

/**
 * Changes the input field of the form
 *
 * @param  {object} AttendanceList The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
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

