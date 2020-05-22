import React, { Component } from 'react';
import OtherPersonBio from "./OtherPersonBio"
import OtherPersonPosts from "./OtherPersonPosts"
import OtherPersonFriendsList from "./OtherPersonFriendList"
import NavBar from "./NavBar"
import SideBar from "./SideBar"


class OtherPersonProfilePage extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <OtherPersonBio />
                <OtherPersonPosts />
                <div className="otherProfileFriendList">
                    <OtherPersonFriendsList />
                </div>
            </React.Fragment>
        );
    }
}

export default OtherPersonProfilePage;