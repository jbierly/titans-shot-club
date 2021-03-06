import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import Drills from './Drills';
import AccountPage from './Account';
import ShotTracker from './ShotTotals';
import DribbleTracker from './DribbleTracker';
import CampTracker from './CampTracker';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      navOpen: ""
    };
  }

  handleNavButtonClick = (event) => {
    event.preventDefault();
    if (this.state.navOpen === "open") {
      this.setState({
        navOpen: ""
      });
    } else {
      this.setState({
        navOpen: "open"
      })
    }
  };
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser){
        this.setState(() => ({ authUser }));
        console.log(authUser);
      } else {
        this.setState(() => ({ authUser: null }));
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} trigger={this.handleNavButtonClick} navOpen={this.state.navOpen} />

          <Route onChange={this.closeNav}
            exact path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUpPage />}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          <Route
            exact path={routes.DRILLS}
            component={() => <Drills authUser={this.state.authUser} />}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={() => <AccountPage authUser={this.state.authUser} />}
          />
          <Route
            exact path={routes.SHOT_TRACKER}
            component={() => <ShotTracker  authUser={this.state.authUser} />}
          />
          <Route
            exact path={routes.DRIBBLE_TRACKER}
            component={() => <DribbleTracker  authUser={this.state.authUser} />}
          />
          <Route
            exact path={routes.CAMP_TRACKER}
            component={() => <CampTracker  authUser={this.state.authUser} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;