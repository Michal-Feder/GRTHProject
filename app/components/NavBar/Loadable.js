/**
 *
 * Asynchronously loads the component for NavBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
