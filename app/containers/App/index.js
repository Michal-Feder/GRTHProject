import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import AttendanceRegistration from 'containers/AttendanceRegistration/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import Navigation from 'containers/Navigation/Loadable';
import AttendanceList from 'containers/AttendanceList/Loadable';

import 'style.scss';

export default function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/AttendanceRegistration" component={AttendanceRegistration} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/AttendanceList" component={AttendanceList} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
