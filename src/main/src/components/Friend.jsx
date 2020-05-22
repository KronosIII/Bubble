import React, { Component } from 'react';
import Avatar from "../avatar.png"
import {
    NavLink
} from "react-router-dom";

class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            emailddr: "",
            firstname: "",
            lastname: ""
        }
    }

    componentDidMount() {
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
            })
        }).then(res => res.json())
            .then(result => {
                console.log("USERNAME!!!!!");
                this.setState({
                    userName: result["users"][0].username
                });
            },
                error => {
                    console.log("Username not returned");
                }
            );
    };


    render() {
        return (
            //   <button onClick={() => removeBill(index)}>𝗫</button>

            <div className="friendOnList">
                <NavLink to="/OtherPersonProfilePage">
                    <input type="image" src={Avatar} id="friendPic" alt="avatar" />
                </NavLink>
                <h5 id="friendName">{this.state.userName}</h5>
                <NavLink to="/ChatPage">
                    {(sessionStorage.getItem("language") != "spanish") && <button id="chatFriend"><center>Chat</center></button>}
                    {(sessionStorage.getItem("language") == "spanish") && <button id="chatFriend"><center>Charla</center></button>}
                </NavLink>
            </div>
        );
    }
}

export default Friend;