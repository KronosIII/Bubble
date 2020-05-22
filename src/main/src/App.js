import React, { Component } from 'react';
import "./styles.css";
import ProfilePage from './components/ProfilePage';
import OtherPersonProfilePage from './components/OtherPersonProfilePage';
import ChatPage from './components/ChatPage';
import FeedPage from "./components/FeedPage";

/*Importing pages */
import Login from "./Login";
import Welcome from "./Welcome";
import Styles from "./Styles";
import SignUp from "./SignUp";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import SignUp4 from "./SignUp4";
import ResetPassword from "./ResetPassword";
import ResetPassword2 from "./ResetPassword2";

import Settings from "./Settings";
import EditProfile from "./EditProfile";
import ProfilePic from "./ProfilePic";
import SignUpComplete from "./SignUpComplete";
import LoadingScreen from "./LoadingScreen"

import DeleteAcc from "./DeleteAcc";

import LoginComplete from "./LoginComplete";

import {
  Route,
  HashRouter
} from "react-router-dom";

export class App extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <HashRouter>
        <div className="content">
          <Route exact path="/" component={Welcome} />
          <Route path="/FeedPage" component={FeedPage} />
          <Route path="/Login" component={Login} />
          <Route path="/Styles" component={Styles} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/ChatPage" component={ChatPage} />
          <Route path="/ProfilePage" component={ProfilePage} />
          <Route path="/Settings" component={Settings} />
          <Route path="/OtherPersonProfilePage" component={OtherPersonProfilePage} />
          <Route path="/LoadingScreen" component={LoadingScreen} />
          <Route path="/SignUp2" component={SignUp2} />
          <Route path="/ResetPassword" component={ResetPassword} />
          <Route path="/ResetPassword2" component={ResetPassword2} />
          <Route path="/EditProfile" component={EditProfile} />
          <Route path="/ProfilePic" component={ProfilePic} />
          <Route path="/SignUpComplete" component={SignUpComplete} />
          <Route path="/SignUp3" component={SignUp3} />
          <Route path="/SignUp4" component={SignUp4} />

          <Route path="/DeleteAcc" component={DeleteAcc} />

          <Route path="/LoginComplete" component={LoginComplete} />


        </div>
      </HashRouter>
    );
  }
}


export default App;