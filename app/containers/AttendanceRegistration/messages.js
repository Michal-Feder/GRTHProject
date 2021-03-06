/*
 * AttendanceRegistration Messages
 *
 * This contains all the text for the AttendanceRegistration container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AttendanceRegistration';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Attendance Registration',
  },
  start: {
    id: `${scope}.start`,
    defaultMessage: 'start',
  },
  end: {
    id: `${scope}.end`,
    defaultMessage: 'end',
  },
});
