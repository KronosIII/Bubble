import React, { Component } from 'react';
import "../styles.css"
import MyMessage from "./MyMessage"
import Message from "./Message"


class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],

        };
    }

    componentDidMount() {
        // var messagesByMe = []
        // var messagesByYou = []
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
                        messages: this.state.messages.sort((a, b) => (a.message_id > b.message_id) ? 1 : (a.message_id === b.message_id) ? ((a.size > b.size) ? 1 : -1) : -1)
                    })
                }
            },
            );
    }


    render() {
        console.log(this.state.messages)
        console.log(sessionStorage.getItem("otherUserID"))
        return (
            <div id="messages">
                {this.state.messages.map(message => (
                    <React.Fragment>
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
            </div>
        );
    }
}

export default Messages;