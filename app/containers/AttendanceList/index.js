import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import List from '../../components/List';
import errorBoundary from '../../ErrorBoundary';
import { makeSelectCurrentUser } from '../App/selectors';
import {makeSelectAttendances} from './selectors'
import reducer from './reducer';
import saga from './saga';
import {getAttendancesById} from './actions';
import messages from './messages';
import './style.scss';

export function AttendanceList({ currentUser,attendances,onGetAttendances }) {
  useInjectReducer({ key: 'attendanceList', reducer });
  useInjectSaga({ key: 'attendanceList', saga });
  const [data, setData] = useState();
  useEffect(() => {
    if (currentUser===false){
      history.push('/Login');
    }
    else{
      onGetAttendances(currentUser.id);
      setData(attendances);
    }
  }, [attendances]);

  const handleCallback=(start, end)=> {
    setData(attendances.filter(item=> Date.parse(item.date) >= Date.parse(new Date(start._d).toDateString()) && Date.parse(item.date) <= Date.parse(new Date(end._d).toDateString())));
  }
  return (
    <div className="attendance-list">
      <Helmet>
        <title>AttendanceList</title>
        <meta name="description" content="Description of AttendanceList" />
      </Helmet>
      <div className="dateRange">
        <table>
          <tr>
            <td>
              <FormattedMessage {...messages.header} />
            </td>
            <td>
              <DateRangePicker onCallback={handleCallback}>
                <input type="text" className="form-control" />
              </DateRangePicker>
            </td>
          </tr>
        </table>
      </div>
      {data &&<List data={data} />}
    </div>
  );
}

AttendanceList.propTypes = {
  currentUser: PropTypes.any,
  onGetAttendances:PropTypes.any,
  attendances:PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  attendances:makeSelectAttendances()
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAttendances:(userId)=>{
      dispatch(getAttendancesById(userId));
    },
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
)(AttendanceList);
