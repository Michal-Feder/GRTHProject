
import React, { memo, useEffect, useState ,useRef} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import errorBoundary from '../../ErrorBoundary';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { addAttendance, updateAttendance ,getCurrentToadayAttendanceOfUser} from './actions';
import './style.scss';
import {makeSelectCurrentUser } from '../App/selectors'
import {makeSelectCurrentTodayAttendance } from './selectors'

const key = 'attendanceRegistration';
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return false;
  }, [delay]);
}
function useTimer() {
  const [ value, setValue ] = useState(new Date());
  useInterval(()=> {
    setValue(new Date());
  }, 1000);
  return value;
}

export function AttendanceRegistration({
  currentUser, onClickStart, onClickEnd,currentTodayAttendance,onGetCurrentToadayAttendanceOfUser}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {Body,Header} = Card;
  const value = useTimer();
  useEffect(() => {
    if (currentUser===false){
      history.push('login');
    }
    else{
      onGetCurrentToadayAttendanceOfUser(currentUser.userid);
    }
  }, []);
  const userStart = currentTodayAttendance.start!==undefined;
  const userEnd = currentTodayAttendance.end!==undefined;
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
        <Header>
          <FormattedMessage {...messages.header} />
        </Header>
        <Body>
          <Clock value={value} />
          <div className="btns">
            <Button
              disabled={!!userStart} onClick={() => onClickStart({userid:currentUser.userid, value} )} variant="warning">
              <FormattedMessage {...messages.start} />
            </Button>
            <Button
              disabled={!userStart || !!userEnd } onClick={() => onClickEnd({currentTodayAttendance, value})} variant="warning">
              <FormattedMessage {...messages.end} />
            </Button>
          </div>
        </Body>
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
    onClickStart: ({userid,value}) => {
      dispatch(addAttendance({ userId:userid, date: new Date().toDateString(), start: new Date(value).toLocaleTimeString()}))
    },
    onClickEnd: ({currentTodayAttendance,value}) => {
      dispatch(updateAttendance({...currentTodayAttendance,end:new Date(value).toLocaleTimeString()}));
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
  errorBoundary
)(AttendanceRegistration);
