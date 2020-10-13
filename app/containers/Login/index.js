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
import 'style.scss';
import errorBoundary from '../../ErrorBoundary';
import {makeSelectError} from '../App/selectors';
import { loginLoaded } from '../App/action'
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export function Login({ onSubmit ,error}) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const nameInput=React.createRef();
  const passwordInput=React.createRef();
  const {Text,Group,Label,Control} = Form;
  const {Body,Header} = Card;
  return (
    <div className="login">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Card className="center">
        <Header>
          <FormattedMessage {...messages.header} />
        </Header>
        <Body>
          <Form onSubmit={(e) => onSubmit(e, nameInput.current.value, passwordInput.current.value)}>
            <Group controlId="formBasicName">
              <Label>
                <FormattedMessage {...messages.name} />

              </Label>
              <Control
                type="text" placeholder="Enter name" ref={nameInput} onClick={() => nameInput.current.focus()} 
              />
              <Text className="text-muted">
              </Text>
            </Group>

            <Group controlId="formBasicPassword">
              <Label>
                <FormattedMessage {...messages.password} />

              </Label>
              <Control
                type="password" placeholder="Enter password" ref={passwordInput} onClick={() => passwordInput.current.focus()}
              />
            </Group>
            <p>{error}</p>
            <Button variant="danger" type="submit">
              <FormattedMessage {...messages.loginButton} />
            </Button>
          </Form>
        </Body>
      </Card>
    </div>
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
  errorBoundary
)(Login);
