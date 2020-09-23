
import React, { memo, useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectUserName, makeSelectAttendanceList, makeSelectUserPassword } from '../App/selectors'
import history from 'utils/history';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { clickStart, clickEnd } from './actions'

import 'style.scss';

//Clock
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

//Bootstrap
import Button from 'react-bootstrap/Button';

const key = 'attendanceRegistration';

export function AttendanceRegistration({
  userName, userPassword, AttendanceList, onClickStart, onClickEnd
}) {
  let userStart = AttendanceList.find(el =>
    (el.userName === userName && el.userPassword === userPassword && el.start !== undefined ? el.date == new Date().toDateString() : false)
  );
  let userEnd = AttendanceList.find(el =>
    (el.userName === userName && el.userPassword === userPassword && el.end !== null ? el.date == new Date().toDateString() : false)
  );
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    if (userName == '' || userPassword == '')
      history.push('/Login');
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };

  }, []);

  return (
    <div>
      <Helmet>
        <title>Attendance Registration</title>
        <meta
          name="description"
          content="Description of AttendanceRegistration"
        />
      </Helmet>
      <div className="center">
        <Clock value={value} /></div>
      <div className="center">
        <Button disabled={userStart == undefined ? false : true} onClick={() => onClickStart({ userName, userPassword, value }
        )} variant="danger">start</Button>
        <Button disabled={userStart == undefined ? true : false || userEnd == undefined ? false : true} onClick={() => onClickEnd({ userName, userPassword, value }
        )} variant="danger">end</Button></div>
    </div>
  );
}

AttendanceRegistration.propTypes = {
  userName: PropTypes.string,
  userPassword: PropTypes.string,
  AttendanceList: PropTypes.any,
  onClickStart: PropTypes.func,
  onClickEnd: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUserName(),
  userPassword: makeSelectUserPassword(),
  AttendanceList: makeSelectAttendanceList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClickStart: (state) => {
      dispatch(clickStart({ userName: state.userName, userPassword: state.userPassword, date: new Date().toDateString(), start: new Date(state.value).toLocaleTimeString(), end: null }))
    },
    onClickEnd: (state) => {
      dispatch(clickEnd({ userName: state.userName, userPassword: state.userPassword, date: new Date().toDateString(), end: new Date(state.value).toLocaleTimeString() }))
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
