import React, { Component } from 'react';
import Avatar from "../avatar.png"
import "../styles.css"
import {
    NavLink
} from "react-router-dom";

class ChatterInfo extends Component {
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
            recName: "",
            profilePictureIndex: "",
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18]
        };
    }

    componentDidMount() {
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
                userid: sessionStorage.getItem("otherUserID")
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    recName: result.users[0].name
                });
            },
                error => {
                    console.log("Username not returned");
                }
            );


        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                userid: sessionStorage.getItem("otherUserID"),
                artifactcategory: "profile"
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.user_artifacts) {
                    this.setState({
                        profilePictureIndex: result.user_artifacts[0].artifact_url
                    })
                }
                else {
                    this.setState({
                        profilePictureIndex: 0
                    })
                }

            },
                error => {
                    console.log("BAD BAD BAD")
                }
            );

    }

    otherProfileLink(id) {
        sessionStorage.setItem("otherUserID", id)
    }

    render() {
        return (
            <div id="chatterInfoOutline">
                <center><img src={this.state.profilePicList[this.state.profilePictureIndex]} alt="Avatar" id="bigChatAvatar" alt="bigAvatar" /></center>
                <center><h3 id="bigName">{this.state.recName}</h3></center>
                <div className="chatFunctionality">
                    {sessionStorage.getItem("otherUserID") == sessionStorage.getItem("user") && <NavLink to="/ProfilePage">
                        {console.log(sessionStorage.getItem("otherUserID"))}
                        <button className="viewProfileButton" styles={{ "margin-left": "500px" }}>
                            {(sessionStorage.getItem("language") != "spanish") && <center>View Profile</center>}
                            {(sessionStorage.getItem("language") == "spanish") && <center>Visitar Perfil</center>}
                        </button>
                    </NavLink>}
                    {sessionStorage.getItem("otherUserID") != sessionStorage.getItem("user") && <NavLink to="/OtherPersonProfilePage">
                        {console.log(sessionStorage.getItem("otherUserID"))}
                        <button className="viewProfileButton" styles={{ "margin-left": "500px" }} onClick={() => this.otherProfileLink(sessionStorage.getItem("otherUserID"))}>
                            {(sessionStorage.getItem("language") != "spanish") && <center>View Profile</center>}
                            {(sessionStorage.getItem("language") == "spanish") && <center>Visitar Perfil</center>}
                        </button>
                    </NavLink>}
                </div>
            </div >
        );
    }
}

export default ChatterInfo;