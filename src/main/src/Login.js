import React, { Component } from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import './styles.css';
import logo from "./logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      session_token: "",
      showError: false,
      language: ""
    };
  }

  toggleError = () => {
    this.setState((prevState, props) => {
      return {
        showError:
          !prevState.showError
      }
    });
  };

  usernameChangeHandler = event => {
    this.setState({
      username: event.target.value
    });
  };

  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  };

  forgotPasswordHandler = event => {
    this.props.history.push('/ResetPassword')
  }

  loginHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "login",
        username: this.state.username,
        password: this.state.password
      })
    })

      .then(res => res.json())

      .then(
        result => {
          console.log("Testing");
          if (result.user) {
            /* save the session token and user_id for later use */
            sessionStorage.setItem("token", result.user.session_token);
            sessionStorage.setItem("user", result.user.user_id);
            sessionStorage.setItem("username", this.state.username);

            this.setState({
              session_token: ""
            });

            console.log("We're IN");
            this.props.history.push('/LoginComplete') //move to the main page
          }

          else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              session_token: "",
              showError: true
            });


            console.log("No Go");
          }
        },

        error => {
          alert("error!");
        }
      )



    // .then(this.props.history.push('/'));
  };


  render() {
    return (
      <div id="form-container"> {/*Whole page's contianer */}

        {/* Flex box for the left side. Contains the background image. */}
        <div id="square-one">
          <Link to="/">
            <div id="loginLinkerCont">
              <img id="bg-pic" src={logo} alt="pic" />
            </div>
          </Link>
        </div>

        {/* Flex box for the right side. Contains forms on the right side. */}
        <div id="square-two">

          <form id="login-form" onSubmit={this.loginHandler}>

            <h1 id="title">Login</h1>

            {this.state.showError && <div id="loginErrorMessage">Wrong username or password!</div>}

            <div class="input-box">
              <input
                type="text"
                placeholder="Username/Email"
                className="input-deco"
                onChange={this.usernameChangeHandler}
              />

              <br />

              <input
                type="password"
                placeholder="Password"
                className="input-deco"
                onChange={this.passwordChangeHandler}
              />

            </div>

            <br />

            {/* NEED TO DO THIS!!! */}
            <div id="forgot-containers">

              <button type="button" className="forgot-links" onClick={this.forgotPasswordHandler}>
                Forgot Password?
              </button>

            </div>

            <br />

            <input type="submit" id="submit-button" value="Login" />

            <Link to="/SignUp"><p id="loginSignup">Sign up!</p></Link>

          </form>

        </div>
      </div>
    );
  }
}

export default Login;