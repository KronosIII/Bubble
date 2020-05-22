import React, { Component } from 'react';
import ConvoInList from "./ConvoInList"
import {
  NavLink
} from "react-router-dom";

class ChatList extends Component {
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
      allUsers: [],
      profilePictureIndex_List: {},
      profilePicList: [avatar, avatar2, avatar3, avatar4,
        avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
        avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18]
    };
  }

  componentDidMount() {
    this.loadFriends();

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
      );
  }


  otherChatLink(id) {
    sessionStorage.setItem("otherUserID", id)
    window.location.reload()
  }


  loadFriends() {
    fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers"
      })
    })
      .then(res => res.json())
      .then(result => {
        var filteredUsers = []
        for (var user of result.users) {
          if (user.name) {
            filteredUsers.push(user)
            console.log("woohoo")
          }
        }
        filteredUsers.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.size > b.size) ? 1 : -1) : -1)
        // console.log("Length: " + this.state.filteredUsers.length)
        this.setState({
          allUsers: filteredUsers
        });
      },
        error => {
          console.log("Username not returned");
        }
      );


  }

  render() {
    return (
      <div id="chatListOutline">
        {(sessionStorage.getItem("language") != "spanish") && <header id="chatHeader">Chat</header>}
        {(sessionStorage.getItem("language") == "spanish") && <header id="chatHeader">Charla</header>}
        <hr></hr>
        <div className="convosInList">
          {this.state.allUsers.map(chatter => (
            <div className="chatFriendOnList">
              <NavLink to="/ChatPage">
                <input onClick={() => this.otherChatLink(chatter.user_id)} type="image" src={this.state.profilePicList[this.state.profilePictureIndex_List[chatter["user_id"]]]} id="chatFriendPic" alt="avatar" />
              </NavLink>
              <div id="wordsInfoConvo">
                <h5 id="chatFriendName">{chatter.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ChatList;