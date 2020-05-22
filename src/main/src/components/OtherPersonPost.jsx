import React, { Component } from 'react';
import Avatar from "../avatar.png"
import Bubbles from "../Bubbles.jpg"
import CommentsSection from "./CommentsSection"
import Like from "./Like"

class OtherPersonPost extends Component {

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
            userName: "",
            posts: [],
            imBlocked: "",
            profilePicIndex: null,
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],


        }
    }
    componentDidMount() {
        console.log("Getting Other User ProfilePic")

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getConnections",
                userid: sessionStorage.getItem("otherUserID"),
                connectuserid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.connections) {
                        if (result.connections[0].connection_status == "blocked") {
                            console.log("blocked")
                            this.setState({
                                imBlocked: true
                            })
                        }
                    }
                },
                error => {
                    this.setState({
                        error
                    });
                }
            );



        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                userid: sessionStorage.getItem("otherUserID"),
                artifactcategory: "profile"
            })
        }).then(res => res.json())
            .then(result => {
                if (result.user_artifacts) {
                    this.setState({
                        profilePicIndex: result["user_artifacts"][0].artifact_url
                    })

                    sessionStorage.setItem("otherUser_picIndex", this.state.profilePicIndex);

                    console.log("Other Person Avatar");
                }
                else {
                    this.setState({
                        profilePicIndex: 0
                    })
                }
            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );

        this.loadPosts();
    };

    loadPosts() {

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getPosts",
                userid: sessionStorage.getItem("otherUserID"),
                max_posts: "50"
            })
        }).then(res => res.json())
            .then(result => {
                if (result.posts) {
                    this.setState({
                        posts: result.posts
                    });
                }
            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );

    }

    render() {
        return (
            < center >
                {(this.state.imBlocked || this.state.posts.length == 0) && (sessionStorage.getItem("language") != "spanish") && <p>No posts to show right now!</p>}
                {(this.state.imBlocked || this.state.posts.length == 0) && (sessionStorage.getItem("language") == "spanish") && <p>¡No hay ninguna publicación por mostrar!</p>}
                {!this.state.imBlocked && this.state.posts.map(post => (
                    <form id="finishedPost">
                        <div>
                            <header className="navbar" id="postHeader" align='left' >{post.name}</header>
                            {/* <font size="6" id="postName">First Last</font> this.state.profilePicList[this.state.profilePicIndex]*/}
                            {this.state.profilePicList[this.state.profilePicIndex] && <img src={this.state.profilePicList[this.state.profilePicIndex]} alt="Avatar" id="avatar" />}
                            {!this.state.profilePicList[this.state.profilePicIndex] && <img src={Avatar} alt="Avatar" id="avatar" />}
                        </div>
                        <br></br>
                        <div className="picWLike">
                            <div className="placeholderTextBox"><p className="postText">{post.post_text}</p></div>
                            <Like />
                        </div>
                        <p id="timeStamp">{post.timestamp}</p>
                        <CommentsSection
                            posts={post.post_id} />
                    </form>
                ))}
            </center >
        );
    }
}

export default OtherPersonPost;