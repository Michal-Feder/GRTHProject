import { END_PRESENCE, START_PRESENCE } from '../App/constants';
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

