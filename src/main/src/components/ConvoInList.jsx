import React, { Component } from 'react';
import Avatar from "../avatar.png"
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import ChatPage from "./ChatPage"
import Message from './Message';

class ConvoInList extends Component {
    constructor(){
        super();
        this.state = {
            name : "Full Name",
            text : "Text"
        };
    }

    // setName(){
    //     fetch("http://stark.cse.buffalo.edu/data/web/cse410/treekings/messagecontroller.php", {
    //         method: "post",
    //         body: JSON.stringify({
    //             action: "getMessages",
    //             recipientid: ""
    //         })
    //     })
    //     .then(results => {
    //         return results.json();
    //     })

    //     this.setState({name:results.recipientid , text:results.message})
    // }

    render() {
        return (
            <div className="chatFriendOnList">
                <NavLink to="/ChatPage">
                    <input type="image" src={Avatar} id="chatFriendPic" />
                </NavLink>
                <div id="wordsInfoConvo">
                    <h5 id="chatFriendName">{this.state.name}</h5>
                    <p id="conversationShownInList" >{this.state.text}</p>
                </div>
            </div>
        );
    }
}

export default ConvoInList;