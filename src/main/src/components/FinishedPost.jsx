import React, { Component } from 'react';
// import Avatar from "../avatar.png"
import Bubbles from "../Bubbles.jpg"
import CommentsSection from "./CommentsSection"
import Like from "./Like"

class FinishedPost extends Component {

    constructor(props) {
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

        super(props);
        console.log("In Constructor");
        this.state = {
            userName: "",
            Post: [],
            profilePic_url: "",
            profilePic: null,
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],
            profilePicIndex: null
        };
        this.loadPosts() =
    };
    componentDidMount() {
        console.log("In the fetch");
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
                userid: sessionStorage.getItem("user")
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log("USERNAME!!!!!");
                this.setState({
                    userName: result["users"][0].name
                });
            },
                error => {
                    console.log("Username not returned");
                }
            );
        fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUserArtifacts",
                user_id: sessionStorage.getItem("user"),
                artifactid: "1"
            })
        })

            .then(res => res.json())
            .then(result => {
                this.setState({
                    profilePic_url: result["user_artifacts"][0].artifact_url,
                    profilePicIndex: result["user_artifacts"][0].artifact_url
                })


                console.log(result["user_artifacts"][0].artifact_url)
                console.log("Got the Pic!!!");
            },
                error => {
                    console.log("Bad Bad Bad");
                }
            )
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getPosts",
                userid: sessionStorage.getItem("user"),
                max_posts: "5"
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.posts) {
                        this.setState({
                            Post: result.posts
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

    };


        //
        // fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
        //     method: "post",
        //     body: JSON.stringify({
        //         action: "getPosts",
        //         userid: sessionStorage.getItem("user"),
        //         max_posts: "5"
        //     })
        // })
        //     .then(res => res.json())
        //     .then(
        //         result => {
        //             if (result.posts) {
        //                 this.setState({
        //                     Post: result.posts
        //                 });
        //             }
        //         },
        //         error => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     );


    render() {
        const { profilePic } = this.state;
        return (
            < center >
                {this.state.Post.map(post => (
                <form id="finishedPost">
                    <div>
                        <header className="navbar" id="postHeader" align='left' >{this.state.userName}</header>
                        <img src={this.state.profilePicList[this.state.profilePicIndex]} alt="Avatar" id="avatar" />
                    </div>
                    <br></br>
                    <div className="picWLike">
                        <div className="placeholderTextBox"><p className="postText">Post Text Here</p></div>
                        <Like />
                    </div>
                    <div id="fixPost">
                        <button id="fixfileButton">
                            <center>Edit Post</center>
                        </button>
                        <button id="fixfileButton">
                            <center>Delete Post</center>
                        </button>
                    </div>
                    <CommentsSection
                         posts = {post.post_id}
                     />
                </form>
                        ))}
            </center >
        );
    }
}

export default FinishedPost;