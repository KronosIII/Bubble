import React, { Component } from "react";
import {
    Link,
    withRouter
} from "react-router-dom";

import "./styles.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_addr: "",
            popUpShown: false
        };
    }

    emailChangeHandler = event => {
        this.setState({
            email_addr: event.target.value
        });
    };

    whereHandler = event => {
        this.setState({
            popUpShown: !this.state.popUpShown
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
                action: "register",
                email_addr: this.state.email_addr
            })
        })

            .then(res => res.json())

            .then(
                result => {
                    console.log("OTP Sent");
                    this.props.history.push('/SignUp2') //move to nxt step
                },
                error => {
                    alert("error!");
                }
            )

        // .then(this.props.history.push('/SignUp2'));

    };

    render() {
        if (!this.state.popUpShown) {
            return (

                <form className="signupPage" onSubmit={this.getOTP_ButtonHandler}>

                    <div className="SignUp">

                        <h1 className="signUpHeading">
                            <Link to="/" className="signUpHeading" title="Home">Sign Up</Link>
                        </h1>

                        <center>
                            <div className="signUpInputLineWidth">

                                <input
                                    className="signUpInput"
                                    type="text"
                                    placeholder="Email"
                                    onChange={this.emailChangeHandler}
                                />
                                {/* <div>
                                <div className="otpTextBox">
                                    <p className="whereText">A one time password is a way to register your email the first time you log in!</p>
                                </div>
                                <div className="whereTab"></div>
                            </div> */}
                                <button className="wherePreClickedButton" onClick={this.whereHandler}>What is a One Time Password?</button>
                                <br />
                                <br />

                                <center>

                                    <input type='submit' className="signUp_otpButtonPostClicked" value="Get One Time Password" />

                                </center>

                            </div>
                        </center>
                    </div>

                </form>

            );
        }
        else {
            return (

                <form className="signupPage" onSubmit={this.getOTP_ButtonHandler}>

                    <div className="SignUp">

                        <h1 className="signUpHeading">
                            <Link to="/" className="signUpHeading" title="Home">Sign Up</Link>
                        </h1>

                        <center>
                            <div className="signUpInputLineWidth">

                                <input
                                    className="signUpInput"
                                    type="text"
                                    placeholder="Email"
                                    onChange={this.emailChangeHandler}
                                />
                                <div>
                                    <div className="otpTextBox">
                                        <p className="whereText">A one time password is a way to register your email the first time you log in!</p>
                                    </div>
                                    <div className="whereTab"></div>
                                </div>
                                <button className="whereButton" onClick={this.whereHandler}>What is a One Time Password?</button>
                                <br />
                                <br />

                                <center>

                                    <input type='submit' className="signUp_otpButtonPre" value="Get One Time Password" />

                                </center>

                            </div>
                        </center>
                    </div>

                </form>

            );
        }
    }
}

export default SignUp;