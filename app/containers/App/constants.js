/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const START_PRESENCE = 'GRTHProject/App/START_PRESENCE';
export const END_PRESENCE = 'GRTHProject/App/END_PRESENCE';
export const SET_NAME_PASSWORD = 'GRTHProject/APP/SET_NAME_PASSWORD'
