import { Route, IndexRoute, Redirect } from 'react-router';
import React from 'react';

import { Client, Main } from '../containers';
import { Login, NotFound } from '../components';
import Root from '../Root';

export default (store) => {
  const requireAuth = function requireAuth(nextState, replace) {
    if (!store.getState().auth.token) {
      replace({ pathname: '/' });
    }
  };

  const authRedirect = function authRedirect(nextState, replace) {
    if (store.getState().auth.token) {
      replace('/messages/');
    }
  };

  return (
    <Route path="/" component={Root}>
      <Route onEnter={requireAuth}>
        <Route path="messages/" component={Client}>
          <Route path=":channelName/" component={Main} />
          <Redirect from=":channelName" to=":channelName/" />
        </Route>
      </Route>
      <IndexRoute component={Login} onEnter={authRedirect} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};
