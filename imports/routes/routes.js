import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

const unathenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = (() => {
  if(Meteor.userId()) {
    browserHistory.push('/dashboard');
  }
});
const onEnterPrivatePage = (() => {
  if(!Meteor.userId()) {
    browserHistory.push('/');
  }
});

export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unathenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.push('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push('/');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} onEnter={onEnterPublicPage}/>
  </Router>
);
