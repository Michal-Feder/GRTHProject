
import { SET_NAME_PASSWORD } from '../App/constants';

export function setNamePassword(name, password) {
  return {
    type: SET_NAME_PASSWORD,
    name,
    password
  };
}