import React, { Component } from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import "./styles.css";

class SignUp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_addr: "",
      token: "",
      new_password: "",
      confirm_pass: "",
      popUpShown: false
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

  whereHandler = event => {
    this.setState({
      popUpShown: !this.state.popUpShown
    });
  };


  signUpHandler = event => {
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

      .then(

        result => {
          console.log("Password Changed!");

          sessionStorage.setItem("first_login", true)
          this.props.history.push('/SignUpComplete') //move to login

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
    if (!this.state.popUpShown) {
      return (

        <form className="signupPage" onSubmit={this.signUpHandler}>

          <div className="SignUp">
            <h1 className="signUpHeading"><Link to="/" className="signUpHeading" title="Home">Sign Up</Link></h1>
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
                <button className="wherePreClickedButton" onClick={this.whereHandler}>Where can I find this?</button>
                <br />
                <br />

                <input
                  className="signUpInput"
                  type="password"
                  secureTextEntry={true}
                  placeholder="New Password"
                  name="psw-repeat"
                  onChange={this.newPassChangeHandler}
                />

                <br />
                <br />

                <input
                  className="signUpInput"
                  type="password"
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  name="psw-repeat"
                  onChange={this.confirmPassChangeHandler}
                />

                <br />
                <br />

                {/* <Link to="SignUp3"> */}
                <input type='submit' className="signUp_otpButton" id="signUp2" value="Sign Up" />
                {/* </Link> */}


              </div>
            </center>
          </div>

        </form>

      );
    }
    else {
      return (

        <form className="signupPage" onSubmit={this.signUpHandler}>

          <div className="SignUp">
            <h1 className="signUpHeading"><Link to="/" className="signUpHeading" title="Home">Sign Up</Link></h1>
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
                <div>
                  <div className="whereTextBox">
                    <p className="whereText">Try checking your email's inbox or even spam!</p>
                  </div>
                  <div className="whereTab"></div>
                </div>
                <button className="whereButton" onClick={this.whereHandler}>Where can I find this?</button>
                <br />
                <br />

                <input
                  className="signUpInput"
                  type="text"
                  placeholder="New Password"
                  name="psw-repeat"
                  onChange={this.newPassChangeHandler}
                />

                <br />
                <br />

                <input
                  className="signUpInput"
                  type="text"
                  placeholder="Confirm Password"
                  name="psw-repeat"
                  onChange={this.confirmPassChangeHandler}
                />

                <br />
                <br />

                {/* <Link to="SignUp3"> */}
                <input type='submit' className="signUp_otpButton" id="signUp2" value="Sign Up" />
                {/* </Link> */}


              </div>
            </center>
          </div>

        </form>

      );
    }
  }
}

export default SignUp2;
