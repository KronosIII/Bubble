import React, { Component } from "react";
import {
    Link,
    withRouter,
    Redirect
} from "react-router-dom";
import "./styles.css";

class SignUpComplete extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({redirect: true}), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return this.state.redirect ? <Redirect to="/Login" /> :
                                  <div id="signUpComplete">
                                    <h2>Signup Complete</h2>
                                    <p> Redirecting you in 5 seconds...</p>
                                    <p> If it doesn't redirect you, click on <Link to="/Login">me.</Link> </p>
                                  </div>
  }
}

export default SignUpComplete;