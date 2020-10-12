import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import messages from './messages';
import {makeSelectError} from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { loginLoaded } from '../App/action'
import './style.scss';
export function Login({ onSubmit ,error}) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const nameInput=React.createRef();
  const passwordInput=React.createRef();
  const {Label,Control} = Form;
  return (
    <div className="login">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Card className="center">
        <Card.Header>
          <FormattedMessage {...messages.header} />
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => onSubmit(e, nameInput.current.value, passwordInput.current.value)}>
            <Form.Group controlId="formBasicName">
              <Label>
                <FormattedMessage {...messages.name} />

              </Label>
              <Control
                type="text" placeholder="Enter name" ref={nameInput} onClick={() => nameInput.current.focus()} 
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                <FormattedMessage {...messages.password} />

              </Form.Label>
              <Form.Control
                type="password" placeholder="Enter password" ref={passwordInput} onClick={() => passwordInput.current.focus()}
              />
            </Form.Group>
            <p>{error}</p>
            <Button disabled={nameInput === '' || passwordInput === ''} variant="danger" type="submit">
              <FormattedMessage {...messages.loginButton} />
            </Button>
          </Form>
        </Card.Body>
      </Card>    </div>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  error:PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  error:makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return ({
    onSubmit: (event, name, password) => {
      event.preventDefault();
      dispatch(loginLoaded({user:{name, password}}));
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
