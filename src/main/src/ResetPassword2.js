import React, { Component } from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import "./styles.css";

class ResetPassword2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_addr: "",
      token: "",
      new_password: "",
      confirm_pass: ""
    };
  }

  emailChangeHandler = event => {
    this.setState({
      email_addr: event.target.value
    });
  };

  tokenChangeHandler = event => {
    this.setState({
      token: event.target.value
    });
  };

  newPassChangeHandler = event => {
    this.setState({
      new_password: event.target.value
    });
  };

  confirmPassChangeHandler = event => {
    this.setState({
      confirm_pass: event.target.value
    });
  };


  resetPassHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "setpassword",
        email_addr: this.state.email_addr,
        token: this.state.token,
        newpassword: this.state.new_password,
        confirmpassword: this.state.confirm_pass
      })
    })
      .then(res => res.json())

      /* Need to do a check here to make sure passwords match? */

      .then(

        result => {
          console.log("Password Reset!");
          this.props.history.push('/Login') //move to next login

          // if (result.user) {
          //   sessionStorage.setItem("token", result.user.session_token);
          //   sessionStorage.setItem("user", result.user.user_id);

          //   this.setState({
          //     sessiontoken: result.user.session_token,
          //     alanmessage: result.user.session_token
          //   });
          // } else {
          //   sessionStorage.removeItem("token");
          //   sessionStorage.removeItem("user");
          //   this.setState({
          //     sessiontoken: "",
          //     alanmessage: result.message
          //   });
          // }

        },
        error => {
          alert("error!");
        }
      )

      // .then(this.props.history.push('/Login'));


  };

  render() {

    return (

      <form className="signupPage" onSubmit={this.resetPassHandler}>

        <div className="SignUp">
          <h1 className="signUpHeading">Reset Password</h1>
          <center>

            <div className="signUpInputLineWidth">

              <input
                className="signUpInput"
                type="text"
                placeholder="Email"
                name="psw-repeat"
                onChange={this.emailChangeHandler}
              />

              <br />
              <br />

              <input
                className="signUpInput"
                type="text"
                placeholder="OTP/Token"
                name="psw-repeat"
                onChange={this.tokenChangeHandler}
              />

              <br />
              <br />

              <input
                className="signUpInput"
                type="password"
                placeholder="New Password"
                name="psw-repeat"
                onChange={this.newPassChangeHandler}
              />

              <br />
              <br />

              <input
                className="signUpInput"
                type="password"
                placeholder="Confirm Password"
                name="psw-repeat"
                onChange={this.confirmPassChangeHandler}
              />

              <br />
              <br />

              <input type='submit' className="signUp_otpButton" value="Reset Password"/>


            </div>
          </center>
        </div>

      </form>

    );
  }
}

export default ResetPassword2;
