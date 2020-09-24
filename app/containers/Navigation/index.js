import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNavigation from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Switch, Route, Link } from 'react-router-dom';
import history from 'utils/history';

import { clickLogout } from '../App/action'

//Bootstrap
import { Button, Navbar, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export function Navigation({ onClickLogout }) {
  useInjectReducer({ key: 'navigation', reducer });
  useInjectSaga({ key: 'navigation', saga });
  const clickLogin = () => {
    history.push('/Login')
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >
          <Link className="lnk" to="/">myProject</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="lnk lnk-nav" to="/">Home</Link>
            <Link className="lnk lnk-nav" to="/AttendanceRegistration">Attendance Registration</Link>
            <Link className="lnk lnk-nav" to="/AttendanceList">Attendance List</Link>
          </Nav>
          <Form inline>
            <Button onClick={clickLogin} variant="danger">Login
            </Button>
            <Button onClick={onClickLogout} variant="outline-danger">
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

Navigation.propTypes = {
  onClickLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  navigation: makeSelectNavigation(),
});

function mapDispatchToProps(dispatch) {
  return ({
    onClickLogout: (state) => {
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
)(Navigation);
