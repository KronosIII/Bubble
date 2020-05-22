import React, { Component } from 'react';
import Avatar from "../avatar.png"
import {
    NavLink
} from "react-router-dom";
import OtherPersonFunctionality from "./OtherPersonFunctionality"

class FriendList extends Component {
    constructor(props) {
        super(props);

        const avatar = require("../avatar.png");
        const avatar2 = require("../avatar2.png");
        const avatar3 = require("../avatar3.png");
        const avatar4 = require("../avatar4.png");
        const avatar5 = require("../avatar5.png");
        const avatar6 = require("../avatar6.png");
        const avatar7 = require("../avatar7.png");
        const avatar8 = require("../avatar8.png");
        const avatar9 = require("../avatar9.png");
        const avatar10 = require("../avatar10.png");
        const avatar11 = require("../avatar11.png");
        const avatar12 = require("../avatar12.png");
        const avatar13 = require("../avatar13.png");
        const avatar14 = require("../avatar14.png");
        const avatar15 = require("../avatar15.png");
        const avatar16 = require("../avatar16.png");
        const avatar17 = require("../avatar17.png");
        const avatar18 = require("../avatar18.png");
        this.state = {
            userid: "",
            followers: [],
            followingIDs: [],
            following: [],
            followersShown: true,
            profilePictureIndex_List: {},
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18]
        };
    }

    componentDidMount() {
        this.loadFollowers();
        this.loadFollowing();

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                artifactcategory: "profile"
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.user_artifacts) {
                    var userToURL = {}
                    for (var artifact of result.user_artifacts) {
                        userToURL[artifact["user_id"]] = Number(artifact["artifact_url"])
                    }
                    this.setState({
                        profilePictureIndex_List: userToURL
                    })
                }

            },
                error => {
                    console.log("BAD BAD BAD")
                }


                // sessionStorage.setItem("otherUser_picIndex", this.state.profilePicIndex);

                // console.log(this.state.profilePicIndex_List)




            );
    }

    otherProfileLink(id) {
        // event.preventDefault();
        sessionStorage.setItem("otherUserID", id)
        // console.log("Blah" + this.state.allUsers[key]["user_id"])
        // console.log("BLAH" + this.state.allUsers["user"][0].user_id)
    }

    otherChatLink(id) {
        // event.preventDefault();
        sessionStorage.setItem("otherUserID", id)
        // console.log("Blah" + this.state.allUsers[key]["user_id"])
        // console.log("BLAH" + this.state.allUsers["user"][0].user_id)
    }

    followerIngSwitch = event => {
        event.preventDefault();
        this.setState({
            followersShown: !(this.state.followersShown)
        })
    }

    checkBlock(connection) {
        return connection["connection_status"] != "blocked"
    }

    loadFollowers() {
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getConnections",
                userid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.connections) {
                        var connects = []
                        for (var connection of result.connections) {
                            if (connection["connection_status"] != "blocked") {
                                connects.push(connection)
                            }
                        }
                        connects.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.size > b.size) ? 1 : -1) : -1)
                        console.log(connects)
                        this.setState({
                            isLoaded: true,
                            followers: connects
                        });
                    }
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    loadFollowing() {
        var connectionIDs = []
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getConnections",
                connectuserid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.connections) {

                        for (var connection of result.connections) {

                            if (connection["connection_status"] != "blocked") {
                                connectionIDs.push(connection["user_id"])
                            }
                        }
                        this.setState({
                            isLoaded: true,
                            // followingIDs: connectionIDs
                        });
                    }
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            .then(result => {
                var followingUsers = []
                for (var followID of connectionIDs) {
                    console.log("hey")
                    fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
                        method: "post",
                        body: JSON.stringify({
                            action: "getUsers",
                            userid: followID
                        })
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.users) {
                                followingUsers.push(result.users[0])
                            }
                        },
                            error => {
                                console.log("Username not returned");
                            }
                        );

                }

                followingUsers.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.size > b.size) ? 1 : -1) : -1)

                console.log(followingUsers)
                this.setState({
                    following: followingUsers
                })
            })
    }
    render() {
        const { error, isLoaded, followers, following } = this.state;
        console.log("me " + this.state.userid)
        return (
            <div id="friendListOutline">
                {this.state.followersShown &&
                    <div>
                        <header id="friendsHeader">
                            {(sessionStorage.getItem("language") != "spanish") && <button id="friendsHeader">Following</button>}
                            {(sessionStorage.getItem("language") == "spanish") && <button id="friendsHeader">Seguidos</button>}
                            {(sessionStorage.getItem("language") != "spanish") && <button id="notshownFriendsHeader" onClick={this.followerIngSwitch}>Followers</button>}
                            {(sessionStorage.getItem("language") == "spanish") && <button id="notshownFriendsHeader" onClick={this.followerIngSwitch}>Seguidores</button>}
                        </header>
                        <hr className="underline"></hr>
                        {/* <div className="search-container">
                            <form action="/action_page.php" id="searchFriends">
                                <input type="text" placeholder="Search..." name="search" id="searchFriendsField" />
                                <button type="submit" id="submitFriendsSearch">Search</button>
                            </form>
                        </div> */}
                        <div id="allFriends">
                            <ul id="friendslist">
                                {followers.length == 0 && (sessionStorage.getItem("language") != "spanish") && <p>_ You're not following anyone right now!</p>}
                                {followers.length == 0 && (sessionStorage.getItem("language") == "spanish") && <p>__ ¡No estás seguiendo a nadie ahora!</p>}
                                {followers.map(follower => (
                                    <div key={follower.connection_id} className="userlist">
                                        <div className="friendOnList">
                                            <NavLink to="/OtherPersonProfilePage">
                                                {console.log(follower.connect_user_id)}
                                                {this.state.profilePictureIndex_List[follower["connect_user_id"]] && <input onClick={() => this.otherProfileLink(follower.connect_user_id)} type="image" src={this.state.profilePicList[this.state.profilePictureIndex_List[follower["connect_user_id"]]]} id="friendPic" alt="avatar" />}
                                                {!this.state.profilePictureIndex_List[follower["connect_user_id"]] && <input onClick={() => this.otherProfileLink(follower.connect_user_id)} type="image" src={Avatar} id="friendPic" alt="avatar" />}
                                            </NavLink>
                                            {/* {console.log(connection)} */}
                                            <h5 id="friendName">{follower.name}</h5>
                                            <NavLink to="/ChatPage">
                                                {(sessionStorage.getItem("language") != "spanish") && <button id="chatFriend" onClick={() => this.otherChatLink(follower.connect_user_id)}><center>Chat</center></button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button id="chatFriend" onClick={() => this.otherChatLink(follower.connect_user_id)}><center>Charla</center></button>}
                                            </NavLink>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>}
                {!this.state.followersShown &&
                    <div>
                        <header id="friendsHeader">
                            {(sessionStorage.getItem("language") != "spanish") && <button id="notshownFriendsHeader" onClick={this.followerIngSwitch}>Following</button>}
                            {(sessionStorage.getItem("language") == "spanish") && <button id="notshownFriendsHeader" onClick={this.followerIngSwitch}>Seguidos</button>}
                            {(sessionStorage.getItem("language") != "spanish") && <button id="friendsHeader" >Followers</button>}
                            {(sessionStorage.getItem("language") == "spanish") && <button id="friendsHeader" >Seguidores</button>}

                        </header>
                        <hr className="underline"></hr>
                        {/* <div className="search-container">
                            <form action="/action_page.php" id="searchFriends">
                                <input type="text" placeholder="Search..." name="search" id="searchFriendsField" />
                                <button type="submit" id="submitFriendsSearch">Search</button>
                            </form>
                        </div> */}
                        <div id="allFriends">
                            <ul id="friendslist">
                                {following.length == 0 && (sessionStorage.getItem("language") != "spanish") && <p>_ No one is following you right now!</p>}
                                {following.length == 0 && (sessionStorage.getItem("language") == "spanish") && <p>__ ¡Nadie está seguiéndote ahora!</p>}
                                {following.map(followed => (
                                    <div key={followed.connection_id} className="userlist">
                                        <div className="friendOnList">
                                            <NavLink to="/OtherPersonProfilePage">

                                                {this.state.profilePictureIndex_List[followed["user_id"]] && <input onClick={() => this.otherProfileLink(followed.user_id)} type="image" src={this.state.profilePicList[this.state.profilePictureIndex_List[followed["user_id"]]]} id="friendPic" alt="avatar" />}
                                                {!this.state.profilePictureIndex_List[followed["user_id"]] && <input onClick={() => this.otherProfileLink(followed.user_id)} type="image" src={Avatar} id="friendPic" alt="avatar" />}
                                            </NavLink>
                                            <h5 id="friendName">{followed.name}</h5>
                                            <NavLink to="/ChatPage">
                                                {(sessionStorage.getItem("language") != "spanish") && <button id="chatFriend" onClick={() => this.otherChatLink(followed.user_id)}><center>Chat</center></button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button id="chatFriend" onClick={() => this.otherChatLink(followed.user_id)}><center>Charla</center></button>}
                                            </NavLink>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default FriendList;