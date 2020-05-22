import React, { Component } from 'react';
import "../styles.css"
import {
    NavLink
} from "react-router-dom";
import FriendList from "./FriendList"

class OtherPersonFunctionality extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            session_token: "",
            connectid: "",
            connectiontype: "",
            friend: "",
            blocked: "",
            imBlocked: "",
        };
    }

    componentDidMount() {
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
                        if (result.connections[0].connection_status == "blocked") {
                            this.setState({
                                imBlocked: true
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
                        console.log("we friends")
                        sessionStorage.setItem("connectionID", result.connections[0]["connection_id"])
                        this.setState({
                            friend: true
                        });
                    }
                    else {
                        this.setState({
                            friend: false
                        });
                    }
                },
                error => {
                    this.setState({
                        error
                    });
                }
            );
        // console.log("YO YO " + this.state.friend)
    }

    friendingHandler = event => {
        event.preventDefault();
        if (!this.state.friend) {
            console.log(sessionStorage.getItem("user"))
            console.log(sessionStorage.getItem("token"))
            console.log(sessionStorage.getItem("otherUserID"))
            fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
                method: "post",
                body: JSON.stringify({
                    action: "addOrEditConnections",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    connectuserid: sessionStorage.getItem("otherUserID"),
                })
            })
                .then(res => res.json())
                .then(
                    result => {
                        console.log(result["Status"])
                        this.setState({ friend: true })
                        sessionStorage.setItem("followerStatus", true)
                        sessionStorage.setItem("connectionID", result["Record Id"])
                    },
                    error => {
                        alert("error!");
                    }
                )
            // .then(window.location.reload())

        }
        else {
            console.log("here" + sessionStorage.getItem("connectionID"))
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
                        console.log(result["Status"])
                        this.setState({ friend: false })
                        sessionStorage.setItem("followerStatus", false)
                        sessionStorage.setItem("connectionID", null)
                    },
                    error => {
                        alert("error!");
                    }
                );
        }

    };

    otherChatLink(id) {
        sessionStorage.setItem("otherUserID", id)
    }

    render() {
        var action = ""
        // if (this.state.blocked && sessionStorage.getItem("language" != "spanish")) { action = "BLOCKED" }
        // else if (this.state.blocked && sessionStorage.getItem("language" == "spanish")) { action = "BLOQUEADO" }
        if (this.state.friend && sessionStorage.getItem("language") != "spanish") { action = "Unfollow" }
        else if (this.state.friend && sessionStorage.getItem("language") == "spanish") { action = "Dejar de Seguir" }
        else if (!this.state.friend && sessionStorage.getItem("language") != "spanish") { action = "Follow" }
        else { action = "Seguir" }
        return (
            <div className="otherFunctionality">
                <NavLink to="/ChatPage">
                    {(sessionStorage.getItem("language") != "spanish") && <button id="chatFriendButton" onClick={() => this.otherChatLink(sessionStorage.getItem("otherUserID"))}>Chat</button>}
                    {(sessionStorage.getItem("language") == "spanish") && <button id="chatFriendButton" onClick={() => this.otherChatLink(sessionStorage.getItem("otherUserID"))}>Charla</button>}
                </NavLink>
                {(!this.state.blocked && !this.state.imBlocked) && <button id="chatFriendButton" onClick={this.friendingHandler}>
                    {action}
                </button>}
                {(this.state.blocked || this.state.imBlocked) && (sessionStorage.getItem("language") != "spanish") && <button id="chatFriendButton" disabled>BLOCKED</button>}
                {(this.state.blocked || this.state.imBlocked) && (sessionStorage.getItem("language") == "spanish") && <button id="chatFriendButton" disabled>BLOQUEADO</button>}
            </div>
        );
    }
}


export default OtherPersonFunctionality;