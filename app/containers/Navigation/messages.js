/*
 * Navigation Messages
 *
 * This contains all the text for the Navigation container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Navigation';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Navigation container!',
  },
  link_1: {
    id: `${scope}.link_1`,
    defaultMessage: 'Attendance Registration',
  },
  link_2: {
    id: `${scope}.link_2`,
    defaultMessage: 'Attendance List',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
});
