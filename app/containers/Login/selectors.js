import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = state => state.global || initialState;

const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

const makeSelectError = () =>
  createSelector(
    selectLoginDomain,
    globalState => globalState.error,
  );

export default makeSelectLogin;
export { selectLoginDomain,makeSelectError };
