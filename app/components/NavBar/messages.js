/*
 * NavBar Messages
 *
 * This contains all the text for the NavBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NavBar component!',
  },
});
