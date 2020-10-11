/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.hedear`,
    defaultMessage: 'Login',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  loginButton: {
    id: `${scope}.loginButton`,
    defaultMessage: 'Login',
  },
});
