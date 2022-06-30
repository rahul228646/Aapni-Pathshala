import Home from './Home';
import Login from './Login';
import Register from './Register';
import Admin from '../layouts/Admin.js' ;
import { createBrowserHistory } from 'history';
// import Page404 from './Page404';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const hist = createBrowserHistory();

const PrivateRoute = (privateRouteProps) => {
  console.log('privateRouteProps', privateRouteProps);
  const { isAuthenticated, component: Component, path } = privateRouteProps;

//   const [isLoggedIn, setLogIn] = useState(false);


  return (
    <Route
      path={path}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/Login' />
        );
      }}
    />
  );
};

function App(props) {
  // component did mount

  useEffect(() => {
    //console.log(props.auth.isAuthenticated);
    props.dispatch(loadUser());
  }, []);

  const { isAuthenticated } = props.auth;
  console.log(isAuthenticated);
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/material-dashboard-react' component={Home} />
        <Route path='/Login' component={Login} />
        <Route path='/Register' component={Register} />
        {props.auth.isAuthenticated === null ? null : (
          <PrivateRoute
            path='/admin'
            component={Admin}
            isAuthenticated={props.auth.isAuthenticated}
          />
        )}
        {/* <Route component={Page404} /> */}
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
