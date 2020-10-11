/*
 * List Messages
 *
 * This contains all the text for the List component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.List';

export default defineMessages({
  th_1: {
    id: `${scope}.th_1`,
    defaultMessage: 'Date',
  },
  th_2: {
    id: `${scope}.th_2`,
    defaultMessage: 'Start',
  },
  th_3: {
    id: `${scope}.th_3`,
    defaultMessage: 'End',
  },
});
