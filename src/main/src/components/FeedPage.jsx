import React, { Component } from 'react';

import Feed from "./Feed"
import UserList from "./UserList"
import LogoSide from "./LogoSide"
import NavBar from './NavBar';
import SideBar from "./SideBar";



class FeedPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialSearchTerm: 'Search the Bubble.....',
            allUsers: []

        }
        this.InputChangeHandler = this.InputChangeHandler.bind(this);
    }
    InputChangeHandler = event => {
        this.setState({
            initialSearchTerm: event.target.value
        })
    }

    componentDidMount() {
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
            })
        })
            .then(res => res.json())
            .then(result => {

                this.setState({
                    allUsers: result
                });
            },
                error => {
                    console.log("Username not returned");
                }
            );


    }

    reload = event => {
        window.location.reload()
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <LogoSide />
                <div className="nonLogoSide">
                    <div id="centerOfFeed">
                        {/* <div className="main-search-container">
                        <form action="/action_page.php" id="searchHome">
                            <input type="text" placeholder={this.state.initialSearchTerm} onInput={this.InputChangeHandler} name="search" id="searchAllField" />
                            <button type="submit" id="submitAllSearch">Search</button>
                        </form>
                    </div> */}
                        {(sessionStorage.getItem("language") != "spanish") && <button className="postCheck" onClick={this.reload}>Don't see your new post? Try reloading the page!</button>}
                        {(sessionStorage.getItem("language") == "spanish") && <button className="postCheck" onClick={this.reload}>¿No vees a tu publicación nueva? ¡Recarga la página!</button>}
                        <div id="feedPosts">
                            <Feed />
                        </div>
                    </div>
                    <div className="FeedPageFriendList">
                        <UserList />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default FeedPage;