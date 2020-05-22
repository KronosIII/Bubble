import React, { Component } from 'react';
import Avatar from "../avatar.png"
import "../styles.css"
import OtherPersonFunctionality from './OtherPersonFunctionality';


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
            name: "",
            username: "",
            Bio: "",
            blocked: "",

            profilePicIndex: null,
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],

        };
    }

    componentDidMount() {
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getConnections",
                userid: sessionStorage.getItem("otherUserID"),
                connectuserid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.connections) {
                        sessionStorage.setItem("otherConnectionID", result.connections[0]["connection_id"])
                        // if (result.connections["connection_status"] && result.conmections["connection_status"] == "blocked") {
                        //     this.setState({
                        //         blocked: true
                        //     })
                        // }
                    }
                },
                error => {
                    this.setState({
                        error
                    });
                }
            );

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getConnections",
                userid: sessionStorage.getItem("user"),
                connectuserid: sessionStorage.getItem("otherUserID")
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.connections) {
                        if (result.connections[0].connection_status == "blocked") {
                            this.setState({
                                blocked: true
                            })
                        }
                    }
                },
                error => {
                    this.setState({
                        error
                    });
                }
            );


        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                userid: sessionStorage.getItem("otherUserID"),
                artifactcategory: "profile"
            })
        }).then(res => res.json())
            .then(result => {
                if (result.user_artifacts) {

                    this.setState({
                        profilePicIndex: result["user_artifacts"][0].artifact_url
                    })

                    sessionStorage.setItem("otherUser_picIndex", this.state.profilePicIndex);

                    console.log("Other Person Avatar");
                }
                else {
                    this.setState({
                        profilePicIndex: 0
                    })
                }

            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                userid: sessionStorage.getItem("otherUserID"),
                artifactcategory: "bio"
            })
        }).then(res => res.json())
            .then(result => {
                if (result.user_artifacts) {
                    this.setState({
                        Bio: result.user_artifacts[0].artifact_url
                    })
                } else {
                    this.setState({
                        Bio: ""
                    })
                }

            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );




        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
                userid: sessionStorage.getItem("otherUserID")
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.users) {
                    console.log("Got the Info!!!");
                    this.setState({
                        name: result["users"][0].name,
                        username: result["users"][0].username
                    });
                }
            })
    }

    blockingHandler = event => {
        event.preventDefault();
        if (!this.state.blocked) {
            this.setState({
                blocked: true
            })

            fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
                method: "post",
                body: JSON.stringify({
                    action: "addOrEditConnections",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    connectionid: sessionStorage.getItem("connectionID"),
                    connectuserid: sessionStorage.getItem("otherUserID"),
                    connectionstatus: "blocked"
                })
            })
                .then(res => res.json())
                .then(
                    result => {
                        if (result) {
                            console.log(result["Status"])
                            this.setState({ friend: false })
                            sessionStorage.setItem("followerStatus", false)
                            sessionStorage.setItem("connectionID", null)
                        }
                    },
                    error => {
                        alert("error!");
                    }
                );
            console.log("connection: " + sessionStorage.getItem("otherConnectionID"))
            fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
                method: "post",
                body: JSON.stringify({
                    action: "deleteConnections",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    connectionid: sessionStorage.getItem("otherConnectionID")
                })
            })
                .then(res => res.json())
                .then(
                    result => {
                        if (result) {
                            sessionStorage.setItem("followerStatus", false)
                            sessionStorage.setItem("otherConnectionID", null)
                        }
                    },
                    error => {
                        alert("error!");
                    }
                );
        } else {
            this.setState({
                blocked: false
            })
            fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
                method: "post",
                body: JSON.stringify({
                    action: "deleteConnections",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    connectionid: sessionStorage.getItem("connectionID")
                })
            })
                .then(res => res.json())
                .then(
                    result => {
                        if (result) {
                            console.log(result["Status"])
                            sessionStorage.setItem("followerStatus", false)
                            sessionStorage.setItem("otherConnectionID", null)
                        }
                    },
                    error => {
                        alert("error!");
                    })
        }

    };


    render() {
        var action = ""
        if (this.state.blocked && sessionStorage.getItem("language") != "spanish") { action = "UnBlock" }
        else if (this.state.blocked && sessionStorage.getItem("language") == "spanish") { action = "Dejar de Bloquear" }
        else if (!this.state.blocked && sessionStorage.getItem("language") != "spanish") { action = "Block" }
        else { action = "Bloquear" }
        return (
            <div className="bio">
                <form id="bio">
                    {this.state.profilePicList[this.state.profilePicIndex] && <img src={this.state.profilePicList[this.state.profilePicIndex]} alt="Avatar" id="avatarBio" />}
                    {!this.state.profilePicList[this.state.profilePicIndex] && <img src={Avatar} alt="Avatar" id="avatarBio" />}
                    <div className="name">
                        <font size="5" id="name">{this.state.name}</font>
                        <br />
                        
                        {/* <font size="4" id="name">{this.state.username}</font> */}
                    </div>
                    <font size="4" id="bioScript">{this.state.Bio}</font>
                    <button onClick={this.blockingHandler} id="blockProfile">{action}</button>
                </form>
                <OtherPersonFunctionality />
            </div>
        );
    }
}

export default Bio;