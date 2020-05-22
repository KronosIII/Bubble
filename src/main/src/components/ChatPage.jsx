import React, { Component } from 'react';
import ChatList from './ChatList';
import ChatterInfo from './ChatterInfo';
import Conversation from './Conversation';
import NavBar from './NavBar';
import SideBar from "./SideBar";


class ChatPage extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <ChatList />
                <Conversation />
                <ChatterInfo />
            </React.Fragment>
        );
    }
}

export default ChatPage;