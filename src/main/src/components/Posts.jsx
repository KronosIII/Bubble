import React, { Component } from 'react';
import Avatar from "../avatar.png"
import CommentsSection from "./CommentsSection"
import Like from "./Like"


class Posts extends Component {
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
        // console.log("In Constructor");
        this.state = {
            name: "",
            posts: [],
            profilePic_url: "",
            profilePic: null,
            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],
            profilePicIndex: null
        };
        // this.deletePost = this.deletePost.bind(this);
    };

    deletePost(post_id) {

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "deletePosts",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                postid: post_id
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log("Post Deleted")
                },
                error => {
                    console.log("Error when deleting post")
                }
            );
        // this.loadPosts();
    }

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
                // console.log("USERNAME!!!!!");
                this.setState({
                    name: result["users"][0].name
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
                userid: sessionStorage.getItem("user"),
                artifactcategory: "profile"
            })
        })

            .then(res => res.json())
            .then(result => {
                if(result.user_artifacts){
                    this.setState({
                        profilePic_url: result["user_artifacts"][0].artifact_url,
                        profilePicIndex: result["user_artifacts"][0].artifact_url
                    })

                    // sessionStorage.setItem("profilePic",this.state.profilePicIndex)


                    // console.log(result["user_artifacts"][0].artifact_url)
                    // console.log("Got the Pic!!!");
                }
            },
                error => {
                    console.log("Bad Bad Bad");
                }
            )
        this.loadPosts();
    };




    loadPosts() {
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getPosts",
                userid: sessionStorage.getItem("user"),
                // posttype: "me",
                max_posts: "50"
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.posts) {
                        this.setState({
                            posts: result.posts
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
        this.forceUpdate();
    }

    render() {
        const { profilePic } = this.state;
        return (
            <div id="posts" >
                {(sessionStorage.getItem("language") != "spanish") && <h2 className="yourPosts">Your Posts</h2>}
                {(sessionStorage.getItem("language") == "spanish") && <h2 className="yourPosts">Tus Publicaciones</h2>}
                <div id="profilePosts">
                    {this.state.posts.length == 0 && (sessionStorage.getItem("language") != "spanish") && <p>No posts to show right now!</p>}
                    {this.state.posts.length == 0 && (sessionStorage.getItem("language") == "spanish") && <p>¡No hay ninguna publicación por mostrar!</p>}
                    <ul>
                        {this.state.posts.map(post => (

                            <div key={post.post_id}>
                                < center >
                                    <form id="finishedPost">
                                        <div>

                                            <header className="navbar" id="postHeader" align='left' >{this.state.name}</header>
                                            {/* <font size="6" id="postName">First Last</font> */}
                                            {this.state.profilePicList[this.state.profilePicIndex] && <img src={this.state.profilePicList[this.state.profilePicIndex]} alt="Avatar" id="avatar" />}
                                            {!this.state.profilePicList[this.state.profilePicIndex] && <img src={Avatar} alt="Avatar" id="avatar" />}
                                        </div>
                                        <br></br>
                                        <div className="picWLike">
                                            <div className="placeholderTextBox"><p className="postText">{post.post_text}</p></div>
                                            <Like />
                                        </div>
                                        <div id="fixPost">
                                            {/* <button id="fixfileButton">
                                                {(sessionStorage.getItem("language") != "spanish") && <center>Edit Post</center>}
                                                {(sessionStorage.getItem("language") == "spanish") && <center>Editar</center>}
                                            </button> */}

                                            <button id="fixfileButton" onClick={() => this.deletePost(post.post_id)}>
                                                {/* <button id="fixfileButton"> */}
                                                {(sessionStorage.getItem("language") != "spanish") && <center>Delete Post</center>}
                                                {(sessionStorage.getItem("language") == "spanish") && <center>Borrar</center>}
                                            </button>
                                        </div>
                                        <CommentsSection
                                            posts={post.post_id} />
                                    </form>
                                </center >
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Posts;