import React, { Component } from "react";
import "../avatar.png"
import "../styles.css"
import Avatar from "../avatar.png"
import {
    NavLink, Link
} from "react-router-dom";

const profilePicture = React.lazy(() => import(this.state.profilePic_url));


class NavBar extends Component {
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
            firstname: "",
            lastname: "",
            Username: "",
            profilePic_url: "",
            profilePic: null,
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],
            profilePicIndex: null
        };
    }

    componentDidMount() {
        //console.log("In the fetch");
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
                userid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log("Got the Info!!!");
                this.setState({
                    Username: result["users"][0].username,
                    firstname: result["users"][0].first_name,
                    lastname: result["users"][0].last_name
                });


                sessionStorage.setItem("firstname", result["users"][0].first_name);
                sessionStorage.setItem("lastname", result["users"][0].last_name);
                sessionStorage.setItem("username", result["users"][0].username);
            },

                error => {
                    console.log("Bad Bad Bad");
                }
            );


        fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                userid: sessionStorage.getItem("user"),
                artifactcategory: "profile"
            })
        })

            .then(res => res.json())
            .then(result => {
                if (result.user_artifacts) {
                    this.setState({
                        // profilePic_url: result["user_artifacts"][0].artifact_url,
                        profilePicIndex: result["user_artifacts"][0].artifact_url
                    })


                    // console.log(result["user_artifacts"][0].artifact_url)
                    console.log("Got the Pic!!!");
                }
                else {
                    this.setState({
                        // profilePic_url: result["user_artifacts"][0].artifact_url,
                        profilePicIndex: 0
                    })
                }
            },
                error => {
                    console.log("Bad Bad Bad");
                }
            )

        // fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
        //     method: "post",
        //     body: JSON.stringify({
        //         action: "getUserArtifacts",
        //         user_id: sessionStorage.getItem("user"),
        //         artifactid: "1"
        //     })
        // })

        //     .then(res => res.json())
        //     .then(result => {
        //         this.setState({
        //             profilePic_url: result["user_artifacts"][0].artifact_url,
        //             profilePicIndex: result["user_artifacts"][0].artifact_url
        //         })


        //         console.log(result["user_artifacts"][0].artifact_url)
        //         console.log("Got the Pic!!!");
        //     },
        //         error => {
        //             console.log("Bad Bad Bad");
        //         }
        //     )
    };

    render() {
        const { profilePic } = this.state;
        return (
            <div>
                <header className="navbar">BUBBLE</header>
                <NavLink to="/ProfilePage">
                    {this.state.profilePicList[this.state.profilePicIndex] && <input type="image" src={this.state.profilePicList[this.state.profilePicIndex]} id="avatar" alt="avatar" />}
                    {!this.state.profilePicList[this.state.profilePicIndex] && <input type="image" src={Avatar} id="avatar" alt="avatar" />}
                </NavLink>
            </div >
        );
    }
};

export default NavBar;