import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { IoMdPerson } from "react-icons/io";
import errorBoundary from '../../ErrorBoundary';
import { clickLogout } from '../App/action';
import { makeSelectCurrentUser } from '../App/selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import logo from '../../images/logo.png';
import './style.scss';
export function Navigation({ onClickLogout,currentUser }) {
  useInjectReducer({ key: 'navigation', reducer });
  useInjectSaga({ key: 'navigation', saga });
  const {Toggle,Collapse}=Navbar;
  return (
    <div className="navigation">
      <Navbar className="navbar" variant="ligth">
        <Link className="logo" to="/login">
          <img src={logo} alt="logo"/>
        </Link>
        <Toggle aria-controls="basic-navbar-nav" />
        <Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="lnk lnk-nav" to="/AttendanceRegistration">
              <FormattedMessage {...messages.link_1} />
            </Link>
            <span className="span">|</span>
            <Link className="lnk lnk-nav" to="/AttendanceList">
              <FormattedMessage {...messages.link_2} />
            </Link>
          </Nav>
          <Form inline>
            <p>{currentUser.name}</p>
            {currentUser&&<p className="icon"><IoMdPerson/></p>}
            <Button onClick={()=>history.push('/Login')} variant="light">
              <FormattedMessage {...messages.login} />
            </Button>
            <Button onClick={onClickLogout} variant="outline-warning">
              <FormattedMessage {...messages.logout} />
            </Button>
          </Form>
        </Collapse>
      </Navbar>
    </div>
  );
}

Navigation.propTypes = {
  onClickLogout: PropTypes.func,
  currentUser:PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  currentUser:makeSelectCurrentUser()});

function mapDispatchToProps(dispatch) {
  return ({
    onClickLogout: () => {
      dispatch(clickLogout());
      history.push('/Login');
    },
  });
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  errorBoundary
)(Navigation);
