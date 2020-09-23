import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectGlobal = state => state.global || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUserName = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userName,
  );

const makeSelectAttendanceList = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.AttendanceList,
  );

const makeSelectUserPassword = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userPassword,
  );


export { makeSelectLocation, makeSelectUserName, makeSelectUserPassword, makeSelectAttendanceList };
