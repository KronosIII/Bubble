import React, { Component } from "react";
import {
  Link,
  withRouter
} from "react-router-dom";

import "./styles.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_addr: "",
    };
  }

  emailChangeHandler = event => {
    this.setState({
      email_addr: event.target.value
    });
  };

  getOTP_ButtonHandler = event => {
    //keep the form from actually submitting
    console.log("OTP Sent");
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "forgotpassword",
        email_addr: this.state.email_addr
      })
    })

      .then(res => res.json())

      .then(
        result => {
          console.log("OTP Sent");
          this.props.history.push('/ResetPassword2') //move to next step
        },
        error => {
          alert("error!");
        }
      )

    // .then(this.props.history.push('/ResetPassword2'));

  };

  render() {

    return (

      <form className="signupPage" onSubmit={this.getOTP_ButtonHandler}>

        <div className="SignUp">

          <h1 className="signUpHeading">
            Reset Password
            </h1>

          <center>
            <div className="signUpInputLineWidth">

              <input
                className="signUpInput"
                type="text"
                placeholder="Email"
                onChange={this.emailChangeHandler}
              />

              <br />
              <br />

              <center>

                <input type='submit' className="signUp_otpButton" value="Get One Time Password" />

              </center>

            </div>
          </center>
        </div>

      </form>

    );
  }
}

export default ResetPassword;
