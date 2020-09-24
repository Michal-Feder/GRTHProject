import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectAttendanceList } from '../App/selectors'

import { setNamePassword } from './actions'
import history from 'utils/history';

//Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function Login({ onSubmit, AttendanceList }) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const [error, setError] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  function handleSubmit(e) {
    const user = AttendanceList.find(item => item.userName == nameInput && item.userPassword == passwordInput);
    if (user == undefined)
      onSubmit(e, nameInput, passwordInput);
    else {
      e.preventDefault();
      setError('Username or password is incorrect');
    }
  }
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <div className="center">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={e => setNameInput(e.target.value)}
              value={nameInput} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
            />
          </Form.Group>
          <p>{error}</p>
          <Button disabled={nameInput == '' || passwordInput == ''} variant="danger" type="submit">
            Submit
           </Button>
        </Form>
      </div>
    </div>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  AttendanceList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  AttendanceList: makeSelectAttendanceList(),
});

function mapDispatchToProps(dispatch) {
  return ({
    onSubmit: (event, name, password) => {
      event.preventDefault();
      dispatch(setNamePassword(name, password));
      history.push('/');
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
)(Login);
