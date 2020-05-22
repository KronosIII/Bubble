import Sidebar from "react-sidebar";
//sidebar renamed and isconfusing
import Hamburger from "./Hamburger_icon.svg.png";
import '../styles.css';
import React, { Component } from "react";
import {
    NavLink,
    withRouter,
    Link
} from "react-router-dom";
import ChatList from './ChatList';


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    logoutHandler = event => {
        //wait
        //event.preventDefault();

        //make the api call to the authentication page
        fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/SocialAuth.php", {
            method: "post",
            body: JSON.stringify({
                action: "logout",
                username: sessionStorage.getItem("username"),
                session_token: sessionStorage.getItem("token")
            })
        })

            .then(res => res.json())

            .then(
                result => {
                    console.log(result);
                    sessionStorage.clear();
                    //this.props.history.push('/Welcome') //move to welcome
                },
                error => {
                    alert("error!");
                }
            )
    }

    otherProfileLink(id) {
        sessionStorage.setItem("otherUserID", id)
    }

    render() {
        return (
            <React.Fragment>
                <Sidebar
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "white" } }}
                    sidebar={<b>
                        <div className="SideBar">
                            <div className="sidebarHeader" ></div>
                            <br></br>
                            {(sessionStorage.getItem("language") != "spanish") &&
                                <React.Fragment>
                                    <Link to="/FeedPage"><button id="menuButton">Feed </button></Link>
                                    <Link to="/ChatPage"><button id="menuButton" onClick={() => this.otherProfileLink("276")}>Chat</button></Link>
                                    <Link to="/Settings"><button id="menuButton">Settings</button></Link>
                                </React.Fragment>}
                            {(sessionStorage.getItem("language") == "spanish") &&
                                <React.Fragment>
                                    <Link to="/FeedPage"><button id="menuButton">Feed </button></Link>
                                    <Link to="/ChatPage"><button id="menuButton" onClick={() => this.otherProfileLink("276")}>Charla</button></Link>
                                    <Link to="/Settings"><button id="menuButton">Ajustes</button></Link>
                                </React.Fragment>

                            }

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />

                            {/* <NavLink to="/Welcome"><button className="logoutButton" id="menuButton"> Logout </button></NavLink> */}
                            {(sessionStorage.getItem("language") != "spanish") && <Link to="/"><button className="logoutButton" id="menuButton" onClick={this.logoutHandler}>Logout</button></Link>}
                            {(sessionStorage.getItem("language") == "spanish") && <Link to="/"><button className="logoutButton" id="menuButton" onClick={this.logoutHandler}>Terminar Cesión</button></Link>}


                            {(sessionStorage.getItem("language") != "spanish") && <p id="copyright"> Copyright 2020 Bubble, Inc. All rights reserved. </p>}
                            {(sessionStorage.getItem("language") == "spanish") && <p id="copyright"> Los derechos de autores 2020 Bubble, Inc. </p>}
                        </div>
                    </b>}
                >
                    <button onClick={() => this.onSetSidebarOpen(this.state)} id="hammy" className="hamburger-button">
                        <img src={Hamburger} alt="hamburger menu" width="30px;" height="30px;" ></img>
                    </button>
                </Sidebar>
            </React.Fragment>
        );
    }
}


export default SideBar;