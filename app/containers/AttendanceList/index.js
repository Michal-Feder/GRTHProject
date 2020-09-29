import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import List from 'components/List';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { makeSelectUserName, makeSelectAttendanceList, makeSelectUserPassword } from '../App/selectors'
import reducer from './reducer';
import saga from './saga';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

export function AttendanceList({ userName, userPassword, attendanceList }) {
  useInjectReducer({ key: 'attendanceList', reducer });
  useInjectSaga({ key: 'attendanceList', saga });
  const [data, setData] = useState(attendanceList.filter(item => item.userName === userName && item.userPassword === userPassword));
  useEffect(() => {
    if (userName === '' || userPassword === '')
      history.push('/Login');
  }, []);
  function handleCallback(start, end) {
    setData(AttendanceList.filter(item => item.userName === userName && item.userPassword === userPassword && Date.parse(item.date) >= Date.parse(new Date(start._d).toDateString()) && Date.parse(item.date) <= Date.parse(new Date(end._d).toDateString())));
  }
  return (

    <div>
      <Helmet>
        <title>AttendanceList</title>
        <meta name="description" content="Description of AttendanceList" />
      </Helmet>
      <div className="dateRange">
        <table
        ><tr>
            <td><span>Search by date: </span></td>
            <td>
              <DateRangePicker onCallback={handleCallback}>
                <input type="text" className="form-control" />
              </DateRangePicker>
            </td>
          </tr>
        </table>
      </div>
      <List data={data} />

    </div>
  );
}

AttendanceList.propTypes = {
  userName: PropTypes.string,
  userPassword: PropTypes.string,
  attendanceList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUserName(),
  userPassword: makeSelectUserPassword(),
  attendanceList: makeSelectAttendanceList()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AttendanceList);
