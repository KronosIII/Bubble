import React, { Component } from 'react';
import Avatar from "../avatar.png"
import Folder from "./file.png"
import Messages from "./Messages"

class Conversation extends Component {
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
            messages: [],
            imBlocked: "",
            recName: "",
            profilePictureIndex: "",
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],

            newMessage: ""
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    componentDidMount() {
        this.loadMessages()

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
                            console.log("blocked")
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
    loadMessages() {
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/messagecontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getMessages",
                recipientid: sessionStorage.getItem("otherUserID"),
                userid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.messages) {
                    this.setState({
                        messages: result.messages
                    })
                }
            }
            );
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/messagecontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getMessages",
                recipientid: sessionStorage.getItem("user"),
                userid: sessionStorage.getItem("otherUserID")
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.messages) {
                    this.setState({
                        messages: this.state.messages.concat(result.messages)
                    })
                    this.setState({
                        messages: this.state.messages.sort((a, b) => (Number(a.message_id) > Number(b.message_id)) ? 1 : -1)
                    })
                }
            },
            );
    }

    handleNewMessage(event) {
        this.setState({
            newMessage: event.target.value
        });
        console.log(this.state.newMessage)
    };


    sendMessage(event) {

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/messagecontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "addOrEditMessages",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                userid: sessionStorage.getItem("user"),
                recipientid: sessionStorage.getItem("otherUserID"),
                message: this.state.newMessage


            })
        })
            .then(res => res.json())
            .then(result => (
                console.log("blahhhhh")
            ))
            .then(this.loadMessages())

            .then(window.location.reload())


    }

    render() {
        return (
            <div className="convoOutline">

                <header className="navbar" id="convoHeader" align='left' >
                    <div className="convoHeaderName" >
                        <h1 className="convoName">{this.state.recName}</h1>
                    </div>
                    <img src={this.state.profilePicList[this.state.profilePictureIndex]} alt="Avatar" id="avatarConvo" />
                </header>
                {this.state.messages.length == 0 &&
                    <div id="messages">
                        {(sessionStorage.getItem("language") != "spanish") && <p>No Messages to display</p>}
                        {(sessionStorage.getItem("language") == "spanish") && <p>No hay mesajes por mostrar</p>}
                    </div>
                }
                {this.state.imBlocked && this.state.messages.length != 0 &&
                    <div id="messages">
                        {(sessionStorage.getItem("language") != "spanish") && <p>No Messages to display</p>}
                        {(sessionStorage.getItem("language") == "spanish") && <p>No hay mesajes por mostrar</p>}
                    </div>
                }
                {(!this.state.imBlocked && this.state.messages.length != 0) && <div id="messages">
                    {console.log("start")}
                    {this.state.messages.map(message => (
                        <React.Fragment>
                            {console.log(message.message_id)}
                            {message.user_id == sessionStorage.getItem("user") &&

                                <div id="myMessageRectangle">
                                    <p id="myLiteralMessage">{message.message}</p>
                                </div>}

                            {message.user_id == sessionStorage.getItem("otherUserID") &&

                                <div id="messageRectangle">
                                    <p> </p>
                                    <p id="literalMessage">{message.message}</p>
                                </div>}
                        </React.Fragment>
                    ))}

                </div>}

                <form id="enterMessage">
                    {/* <input type="text" id="messageArea" placeholder="Send A Message..." value={this.state.newMessage} onChange={this.handleNewMessage} /> */}
                    <textarea onChange={this.handleNewMessage} value={this.state.newMessage} id="messageArea" placeholder="Send A Message..."></textarea>
                    <div className="wrapperMessage">
                        <span />
                        {!this.state.imBlocked && <center>
                            {(sessionStorage.getItem("language") != "spanish") && <button onClick={(event) => this.sendMessage(event)} id="sendMessage" type="submit" value="Send" name="PostContent" >Send </button>}
                            {(sessionStorage.getItem("language") == "spanish") && <button onClick={(event) => this.sendMessage(event)} id="sendMessage" type="submit" value="Mandar" name="PostContent" >Mandar </button>}
                            {/* <input onClick={(event) => this.sendMessage(event)} id="sendMessage" type="submit" value="Send" name="PostContent" /> */}
                        </center>}
                        {this.state.imBlocked && <center>
                            {(sessionStorage.getItem("language") != "spanish") && <button id="sendMessage" type="submit" value="Send" name="PostContent" >BLOCKED </button>}
                            {(sessionStorage.getItem("language") == "spanish") && <button id="sendMessage" type="submit" value="Mandar" name="PostContent" >BLOQUEADO </button>}
                            {/* <input onClick={(event) => this.sendMessage(event)} id="sendMessage" type="submit" value="Send" name="PostContent" /> */}
                        </center>}
                    </div>
                </form>

            </div>
        );
    }
}

export default Conversation;