import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import errorBoundary from '../../ErrorBoundary';
import NotFoundPage from '../NotFoundPage/Loadable';
import Login from '../Login/Loadable';
import Navigation from '../Navigation/Loadable';
import AttendanceList from '../AttendanceList/Loadable';
import AttendanceRegistration from '../AttendanceRegistration/Loadable';
import saga from './saga';
import {loadAttendances} from './action';
import {makeSelectAttendanceList,makeSelectLoading,makeSelectError} from './selectors'
import 'style.scss';

export function App() {
  useInjectSaga({ key: 'app', saga });

  return (
    <div className="app">
      <Navigation />
      <Switch>
        <Route exact path="/AttendanceRegistration" component={AttendanceRegistration} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route exact path="/AttendanceList" component={AttendanceList} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
App.propTypes = {
  attendanceList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadAttendanceList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  attendanceList: makeSelectAttendanceList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadAttendanceList: () => dispatch(loadAttendances()),
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
)(App);
