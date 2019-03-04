import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import UserRoute from './components/user-route';

import Login from './routes/login';
import Games from './routes/games';
import Game from './routes/game';
import NotFound from './routes/not-found';

import './App.css';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <main className="main">
         <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact render={() => (
              isAuthenticated ? (
                <Redirect to="/games" />
              ) : (
                <Redirect to="/login" />
              )
            )}/>
            <Route path="/login" exact component={Login} />
            <UserRoute path="/games" exact authenticated={isAuthenticated} component={Games} />
            <UserRoute path="/game/:id" exact authenticated={isAuthenticated} component={Game} />
            <Route component={NotFound} />
          </Switch>
          <CookieConsent
            buttonStyle={{ cursor: "pointer" }}
          >
            This site uses cookies
          </CookieConsent>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default withRouter(connect(mapStateToProps)(App));
