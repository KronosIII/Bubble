import React, { Component } from "react";
import {
    Link,
    withRouter
} from "react-router-dom";
import Avatar from "./avatar.png"
import Avatar2 from "./avatar2.png"
import Avatar3 from "./avatar3.png"
import Avatar4 from "./avatar4.png"
import Avatar5 from "./avatar5.png"
import Avatar6 from "./avatar6.png"
import Avatar7 from "./avatar7.png"
import Avatar8 from "./avatar8.png"
import Avatar9 from "./avatar9.png"
import Avatar10 from "./avatar10.png"
import Avatar11 from "./avatar11.png"
import Avatar12 from "./avatar12.png"
import Avatar13 from "./avatar13.png"
import Avatar14 from "./avatar14.png"
import Avatar15 from "./avatar15.png"
import Avatar16 from "./avatar16.png"
import Avatar17 from "./avatar17.png"
import Avatar18 from "./avatar18.png"
import "./styles.css";

class SignUp3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option1: Avatar,
            option2: Avatar2,
            option3: Avatar3,
            option4: Avatar4,
            option5: Avatar5,
            option6: Avatar6,
            option7: Avatar7,
            option8: Avatar8,
            option9: Avatar9,
            option10: Avatar10,
            option11: Avatar11,
            option12: Avatar12,
            option13: Avatar13,
            option14: Avatar14,
            option15: Avatar15,
            option16: Avatar16,
            option17: Avatar17,
            option18: Avatar18,
            current: Avatar,
            current_url: "",
            profilepicindex: null
        };
    }

    handleOption1 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option1,
            current_url: "./avatar.png",
            profilepicindex: 0
        });
    };

    handleOption2 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option2,
            current_url: "./avatar2.png",
            profilepicindex: 1
        });
    };

    handleOption3 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option3,
            current_url: "./avatar3.png",
            profilepicindex: 2
        });
    };

    handleOption4 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option4,
            current_url: "./avatar4.png",
            profilepicindex: 3
        });
    };

    handleOption5 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option5,
            current_url: "./avatar5.png",
            profilepicindex: 4
        });
    };

    handleOption6 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option6,
            current_url: "./avatar6.png",
            profilepicindex: 5
        });
    };

    handleOption7 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option7,
            current_url: "./avatar7.png",
            profilepicindex: 6
        });
    };

    handleOption8 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option8,
            current_url: "./avatar8.png",
            profilepicindex: 7
        });
    };

    handleOption9 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option9,
            current_url: "./avatar9.png",
            profilepicindex: 8
        });
    };

    handleOption10 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option10,
            current_url: "./avatar10.png",
            profilepicindex: 9
        });
    };

    handleOption11 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option11,
            current_url: "./avatar11.png",
            profilepicindex: 10
        });
    };

    handleOption12 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option12,
            current_url: "./avatar12.png",
            profilepicindex: 11
        });
    };

    handleOption13 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option13,
            current_url: "./avatar13.png",
            profilepicindex: 12
        });
    };

    handleOption14 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option14,
            current_url: "./avatar14.png",
            profilepicindex: 13
        });
    };

    handleOption15 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option15,
            current_url: "./avatar15.png",
            profilepicindex: 14
        });
    };

    handleOption16 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option16,
            current_url: "./avatar16.png",
            profilepicindex: 15
        });
    };

    handleOption17 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option17,
            current_url: "./avatar17.png",
            profilepicindex: 16
        });
    };

    handleOption18 = event => {
        event.preventDefault();
        this.setState({
            current: this.state.option18,
            current_url: "./avatar18.png",
            profilepicindex: 17
        });
    };

    submitAvatar = event => {
        event.preventDefault();
        sessionStorage.setItem("profilePic", this.state.current);

        fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "addOrEditUserArtifacts",
                user_id : sessionStorage.getItem("user"),
                session_token : sessionStorage.getItem("token"),
                userid : sessionStorage.getItem("user"),
                artifacttype : "picture",
                artifactcategory : "profile",
                artifacturl : this.state.profilepicindex
            })
        })


        .then(res => res.json())
        .then(result => {
                console.log("ProfilePic Set!!!");
                this.props.history.push('/SignUp4')


            },
            error => {
                console.log("Bad Bad Bad");
            }


        )
    }


    render() {
        return (
            <form className="signupPage" onSubmit={this.submitAvatar}>

                <div className="SignUp">

                    <h1 className="signUpHeading">
                        <Link to="/" className="signUpHeading" title="Home">Choose your Avatar</Link>
                    </h1>

                    <center>

                        <br />
                        <div className="current">

                            <input type="image" src={this.state.current} alt="avatar" className="currentPic" />
                            <p className="currentLabel">Current Picture</p>
                        </div>
                        <div className="optionPics">
                            <input onClick={this.handleOption1} type="image" src={this.state.option1} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption2} type="image" src={this.state.option2} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption3} type="image" src={this.state.option3} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption4} type="image" src={this.state.option4} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption5} type="image" src={this.state.option5} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption6} type="image" src={this.state.option6} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption7} type="image" src={this.state.option7} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption8} type="image" src={this.state.option8} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption9} type="image" src={this.state.option9} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption10} type="image" src={this.state.option10} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption11} type="image" src={this.state.option11} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption12} type="image" src={this.state.option12} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption13} type="image" src={this.state.option13} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption14} type="image" src={this.state.option14} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption15} type="image" src={this.state.option15} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption16} type="image" src={this.state.option16} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption17} type="image" src={this.state.option17} alt="avatar" className="optionPic" />
                            <input onClick={this.handleOption18} type="image" src={this.state.option18} alt="avatar" className="optionPic" />
                        </div>
                        <div className="signUpInputLineWidth">
                            <center>

                                {/* <Link to="SignUpComplete"> */}
                                    <input type='submit' className="signUp_otpButtonPostClicked" value="Submit Avatar" />
                                {/* </Link> */}

                            </center>

                        </div>
                    </center>
                </div>

            </form>
        )
    }
}

export default SignUp3;