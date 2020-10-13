import produce from 'immer';
import {
  LOGOUT ,
  LOGIN_LOADED,
  LOGIN_LOADED_SUCCESS,
  LOGIN_LOADED_ERROR
} from './constants';

export const initialState = {
  currentUser: false,
  error: false, 
  loading: false,
};

const appReducer = (state = initialState, action) =>
  produce(state, (   draft   ) => {
    switch (action.type) {
      case LOGOUT:
        draft.error = false;
        draft.currentUser = false;
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