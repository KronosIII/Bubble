import React, { Component } from "react";
import {
    Link,
    withRouter,
    Redirect
} from "react-router-dom";
import "./styles.css";

class LoadingScreen extends Component {
    state = {
    }

    componentDidMount() {
    }

    render() {
        return <Redirect to="/OtherPersonProfilePage" />
    }
}

export default LoadingScreen;