
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import history from 'utils/history';
import { FormattedMessage } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { addAttendance, updateAttendance ,getCurrentToadayAttendanceOfUser} from './actions';
import 'style.scss';
import './style.scss';
import {makeSelectCurrentUser } from '../App/selectors'
import {makeSelectCurrentTodayAttendance } from './selectors'

const key = 'attendanceRegistration';

export function AttendanceRegistration({
  currentUser, onClickStart, onClickEnd,currentTodayAttendance,onGetCurrentToadayAttendanceOfUser
}) {
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    if (currentUser===false){
      window.location.assign('/Login');
      // history.push('login');
    }
    else{
      onGetCurrentToadayAttendanceOfUser(currentUser.id)
      const interval = setInterval(() => setValue(new Date()), 1000);
      return () => {
        clearInterval(interval);
      }}
    return null;
  }, []);
  const userStart = currentTodayAttendance.start!==undefined;
  const userEnd = currentTodayAttendance.end!==undefined;
  const buttonStartIsDisable = !(userStart === false);
  const buttonEndIsDisable = (userStart === false) || !(userEnd === false);
 
  return (
    <div className="attendance-registration">
      <Helmet>
        <title>Attendance Registration</title>
        <meta
          name="description"
          content="Description of AttendanceRegistration"
        />
      </Helmet>
      <Card className="center">
        <Card.Header>
          <FormattedMessage {...messages.header} />
        </Card.Header>
        <Card.Body>
          <Clock value={value} />
          <div className="btns">
            <Button
              disabled={buttonStartIsDisable} onClick={() => onClickStart({id:currentUser.id, value} )} variant="danger">
              <FormattedMessage {...messages.start} />
            </Button>
            <Button
              disabled={buttonEndIsDisable} onClick={() => onClickEnd({currentTodayAttendance, value})} variant="danger">
              <FormattedMessage {...messages.end} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div >
  );
}

AttendanceRegistration.propTypes = {
  currentUser:PropTypes.any,
  onClickStart: PropTypes.func,
  onClickEnd: PropTypes.func,
  currentTodayAttendance:PropTypes.any,
  onGetCurrentToadayAttendanceOfUser:PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentTodayAttendance: makeSelectCurrentTodayAttendance(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClickStart: (state) => {
      dispatch(addAttendance({ userId:state.id, date: new Date().toDateString(), start: new Date(state.value).toLocaleTimeString(),}))
    },
    onClickEnd: (state) => {
      dispatch(updateAttendance({...state.currentTodayAttendance,end:new Date(state.value).toLocaleTimeString()}));
    },
    onGetCurrentToadayAttendanceOfUser:(userId)=>{
      dispatch(getCurrentToadayAttendanceOfUser(userId));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AttendanceRegistration);
