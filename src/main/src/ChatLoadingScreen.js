import React, { Component } from "react";
import {
    Link,
    withRouter,
    Redirect
} from "react-router-dom";
import "./styles.css";

class ChatLoadingScreen extends Component {
    render() {
        return <Redirect to="/ChatPage" />
    }
}

export default ChatLoadingScreen;