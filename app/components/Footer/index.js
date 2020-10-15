import React, { memo } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
import youtube from '../../images/youtube.svg';
import pinterest from '../../images/pinterest.svg';
import twitter from '../../images/twitter.svg';
import errorBoundary from '../../ErrorBoundary';
import messages from './messages';
import './style.scss';

function Footer() {
  return (
    <div className="footer">
      <section>
        <a target="_blank" href="https://instagram.com/"><img className="icon" alt="instagram" title="Go to instagram (new window)" src={instagram} /></a>
        <a target="_blank" href="https://www.facebook.com/"><img className="icon" alt="facebook"  title="Go to facebook (new window)" src={facebook}/></a>
        <a target="_blank" href="https://twitter.com/"><img className="icon" alt="twitter"  title="Go to twitter (new window)" src={twitter} /></a>
        <a target="_blank" href="https://www.youtube.com/"><img className="icon" alt="youtube"  title="Go to youtube (new window)" src={youtube} /></a>
        <a target="_blank" href="https://www.pinterest.com/"><img className="icon" alt="pinterest"  title="Go to pinterest (new window)" src={pinterest} /></a>
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <a target="_blank" href="https://github.com/Michal-Feder">Michal Feder</a>,
          }}
        />
      </section>
    </div>
  );
}

Footer.propTypes = {};

export default compose(
  memo,
  errorBoundary
)(Footer);


