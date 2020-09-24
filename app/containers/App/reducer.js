import produce from 'immer';
import { START_PRESENCE, END_PRESENCE, SET_NAME_PASSWORD, RESET_NAME_PASSWORD } from './constants'

export const initialState = {
    userName: '',
    userPassword: '',
    error: false,
    AttendanceList: [{ userName: '', userPassword: '', date: '', start: Date, end: Date }],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case START_PRESENCE:
                draft.AttendanceList.push(action.AttendanceList);
                break;
            case END_PRESENCE:
                const index = draft.AttendanceList.findIndex(e => e.userName == action.AttendanceList.userName && e.userPassword == action.AttendanceList.userPassword && e.date == action.AttendanceList.date);
                draft.AttendanceList[index].end = action.AttendanceList.end;
                break;
            case SET_NAME_PASSWORD:
                draft.error = false;
                draft.userName = action.name;
                draft.userPassword = action.password;
                break;
            case RESET_NAME_PASSWORD:
                draft.error = false;
                draft.userName = '';
                draft.userPassword = '';
                break;
        }
    });

export default appReducer;