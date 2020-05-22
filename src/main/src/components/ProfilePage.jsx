import React, { Component } from 'react';
import Bio from "./Bio"
import PostPopUp from "./PostPopUp"
import Posts from "./Posts"
import FriendsList from "./FriendList"
import NavBar from './NavBar';
import SideBar from "./SideBar";

class ProfilePage extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <PostPopUp />
                <Bio/>
                {/* <button className="postCheckProfile">Don't see your new post? Try reloading the page!</button> */}
                <div className="profilePagePosts">
                    <Posts />
                </div>
                <div className="profilePageFriendList">
                    <FriendsList />
                </div>
            </React.Fragment>
        );
    }
}

export default ProfilePage;