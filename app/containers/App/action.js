import { RESET_NAME_PASSWORD } from './constants'
export function clickLogout() {
  return {
    type: RESET_NAME_PASSWORD,
  };
}