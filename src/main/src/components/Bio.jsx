import React, { Component } from 'react';
import Avatar from "../avatar.png"
import "../styles.css"
import {
    Link,
    withRouter
} from "react-router-dom";
import settingIcon from "./settingIcon.png"


class Bio extends Component {
    constructor(props) {
        super(props);
        const avatar = require("../avatar.png");
        const avatar2 = require("../avatar2.png");
        const avatar3 = require("../avatar3.png");
        const avatar4 = require("../avatar4.png");
        const avatar5 = require("../avatar5.png");
        const avatar6 = require("../avatar6.png");
        const avatar7 = require("../avatar7.png");
        const avatar8 = require("../avatar8.png");
        const avatar9 = require("../avatar9.png");
        const avatar10 = require("../avatar10.png");
        const avatar11 = require("../avatar11.png");
        const avatar12 = require("../avatar12.png");
        const avatar13 = require("../avatar13.png");
        const avatar14 = require("../avatar14.png");
        const avatar15 = require("../avatar15.png");
        const avatar16 = require("../avatar16.png");
        const avatar17 = require("../avatar17.png");
        const avatar18 = require("../avatar18.png");

        this.state = {
            name: "NAME",
            username: "USERNAME",
            BioText: 'Tell us About Yourself!',

            returnId: this.props.returnId,
            returnedText: this.props.returnedText,

            profilePic_url: "",
            profilePic: null,
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],
            profilePicIndex: null,

            artifact_id: ""
        };
        // this.BioChangeHandler = this.BioChangeHandler.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);
        // this.returnedText = this.returnedText.bind(this);
    };


    componentDidMount() {
        console.log("In the fetch");
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
                userid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log("USERNAME!!!!!");
                this.setState({
                    name: result["users"][0].name,
                    username: result["users"][0].username
                });
            },
                error => {
                    console.log("Username not returned");
                }
            );

        // fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
        //     method: "post",
        //     body: JSON.stringify({
        //         action: "getUserArtifacts",
        //         user_id: sessionStorage.getItem("user"),
        //         artifact_category: "profile"

        //     })
        // })

        // .then(res => res.json())
        // .then(result => {

        //     this.setState({
        //         artifact_id: result["user_artifacts"][0].artifact_id

        //     })
        //     // console.log(result["user_artifacts"][0].artifact_id)
        //     // sessionStorage.setItem("artifact_id", result["user_artifacts"][0].artifact_id)

        //     },
        //     error => {
        //         console.log("Bad Bad Bad");
        //     }


        // )

        fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                userid: sessionStorage.getItem("user"),
                artifactcategory: "profile"
            })
        })

            .then(res => res.json())
            .then(result => {
                if (result.user_artifacts) {
                    this.setState({
                        //   profilePic_url: result["user_artifacts"][0].artifact_url,
                        profilePicIndex: result["user_artifacts"][0].artifact_url
                    })
                    //    console.log(result["user_artifacts"][0].artifact_url)
                    console.log("Got the Pic!!!");
                }
            },
                error => {
                    console.log("Bad Bad Bad");
                }
            )

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                userid: sessionStorage.getItem("user"),
                artifactcategory: "bio"
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log("Pref returned");
                if (result["user_artifacts"]) {
                    this.setState({
                        // returnedText: result["user_prefs"][0]["artifact_url"]
                        BioText: result["user_artifacts"][0].artifact_url
                    });
                }
                else {
                    this.setState({
                        // returnedText: result["user_prefs"][0]["artifact_url"]
                        BioText: ""
                    });
                }
            },
                error => {
                    console.log("Bio does not exist");
                }
            );


    };



    // submitHandler = event => {
    //     event.preventDefault();
    //     // let today = new Date();
    //     // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //     // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     // let dateTime = date + ' ' + time;
    //     // console.log("API SENT");
    //     fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/upcontroller.php", {
    //         method: "post",
    //         body: JSON.stringify({
    //             action: "addOrEditUserPrefs",
    //             user_id: sessionStorage.getItem("user"),
    //             session_token: sessionStorage.getItem("token"),
    //             userid: sessionStorage.getItem("user"),
    //             prefname: "Bio Update",
    //             prefvalue: this.state.BioText,
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log(result);
    //             this.setState({
    //                 returnId: result["Record Id"]
    //             });
    //             //console.log(this.state.returnId.toString());
    //         },
    //             error => {
    //                 console.log("Error");
    //             }
    //         );
    //     this.loadBio()
    //     this.componentDidMount();
    // };

    // loadBio() {

    // };

    // returnedText = e => {
    //     this.setState({
    //         returnedText: this.state.returnedText
    //     })
    // }
    // BioChangeHandler = event => {
    //     console.log("Activity registered");
    //     this.setState({
    //         BioText: event.target.value
    //     })
    // }

    editProfile = event => {


    }

    render() {
        const { profilePic } = this.state;
        return (
            <div className="myBio">
                <form id="mybio">
                    <Link to="/Settings">
                        <img src={this.state.profilePicList[this.state.profilePicIndex]} alt="Avatar" id="avatarBio" />
                    </Link>
                    <div className="name">
                        <font size="5" id="name">{this.state.name}</font>
                        <br />
                        <br />
                        {/* <font size="4" id="name">{this.state.username}</font> */}
                    </div>
                    <font size="4" id="bioScript">{this.state.BioText}</font>
                    {/* <textarea id="bioScript" value={this.state.BioText} /> */}
                    {/* {(sessionStorage.getItem("language") != "spanish") && */}
                        <Link to="/Settings"><img src={settingIcon} id="settingIcon"  alt="Setting "/>

                            {/*//refreshPage(){ window.parent.location = window.parent.location.href; }*/}
                  {/*  </button> */}
                  </Link>
                {/* {(sessionStorage.getItem("language") == "spanish") &&
                        <Link to="/Settings"><button id="editProfile"  > */}

                            {/*//refreshPage(){ window.parent.location = window.parent.location.href; }*/}
                    {/*      Editar Perfil
                        </button></Link>} */}
                </form>
            </div>
        );
    }
}
export default Bio;