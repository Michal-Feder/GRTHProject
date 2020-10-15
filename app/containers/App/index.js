import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import 'style.scss';
import errorBoundary from '../../ErrorBoundary';
import Footer from '../../components/Footer'
import NotFoundPage from '../NotFoundPage/Loadable';
import Login from '../Login/Loadable';
import Navigation from '../Navigation/Loadable';
import AttendanceList from '../AttendanceList/Loadable';
import AttendanceRegistration from '../AttendanceRegistration/Loadable';
import saga from './saga';

export function App() {
  useInjectSaga({ key: 'app', saga });

  return (
    <div className="app">
      <Navigation />
      <Switch>
        <Route exact path="/AttendanceRegistration" component={AttendanceRegistration} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/" component={AttendanceRegistration} />
        <Route exact path="/AttendanceList" component={AttendanceList} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer/>
    </div>
  );
}
App.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps() {
  return {
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
