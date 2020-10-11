import produce from 'immer';
import { GET_ATTENDANCES_BY_ID_SUCCESS } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const attendanceListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_ATTENDANCES_BY_ID_SUCCESS:
        draft.attendances=action.attendances;
        break;
      default:
        break;
    }
  });

export default attendanceListReducer;
