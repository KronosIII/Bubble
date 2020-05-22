import React, { Component } from 'react';
import Logo from "../logo.png"
import PostPopUp from "./PostPopUp"

class LogoSide extends Component {
    state = {}
    render() {
        return (
            <div id="homeSide">
                <img src={Logo} alt="logo" width="220px;" height="200px;" id="homeLogo"></img>
                <PostPopUp />
            </div>
        );
    }
}

export default LogoSide;