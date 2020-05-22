
import React, { Component } from 'react';
import Avatar from "../avatar.png"
import Bubbles from "../Bubbles.jpg"
import CommentsSection from "./CommentsSection"
import Like from "./Like"

class Feed extends Component {

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
            name: '',
            posts: [],
            everyonePosts: [],

            postsLength: 0,

            followingIDs: [],

            onFollowing: true,

            noFollowing: false,
            noOwnPosts: false,

            allBlocked: [],

            profilePictureIndex_List: {},

            profilePicIndex2: null,

            profilePicList: [avatar, avatar2, avatar3, avatar4,
                avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
                avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18]


        }
    }


    componentDidMount() {
        var connectionIDs = [sessionStorage.getItem("user")]
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

                        for (var connection of result.connections) {
                            connectionIDs.push(connection["connect_user_id"])
                        }
                        this.setState({
                            followingIDs: connectionIDs
                        });
                    }
                    else {
                        this.setState({
                            noFollowing: true
                        })
                    }
                },
                error => {
                    this.setState({
                        error
                    });
                }
            )

        var blockedIDs = []
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/connectioncontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getConnections",
                userid: sessionStorage.getItem("user"),
                connectionstatus: "blocked"
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.connections) {

                        for (var connection of result.connections) {
                            blockedIDs.push(connection["connect_user_id"])
                        }
                        this.setState({
                            followingIDs: blockedIDs
                        });
                    }
                },
                error => {
                    this.setState({
                        error
                    });
                }
            )


        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getPosts",
                max_posts: "50"
            })
        }).then(res => res.json())
            .then(result => {
                if (result.posts) {
                    var noblocked = []
                    for (var post of result.posts) {
                        if (!blockedIDs.includes(post.user_id)) {
                            noblocked.push(post)
                        }
                    }
                    this.setState({
                        posts: noblocked
                    });
                }
            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getPosts",
                posttype: "everyone",
                max_posts: "50"
            })
        }).then(res => res.json())
            .then(result => {
                if (result.posts) {
                    var noblocked = []
                    for (var post of result.posts) {
                        if (!blockedIDs.includes(post.user_id)) {
                            noblocked.push(post)
                        }
                    }
                    this.setState({
                        everyonePosts: noblocked
                    });
                }
            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getPosts",
                userid: sessionStorage.getItem("user")
            })
        }).then(res => res.json())
            .then(result => {
                if (!result.posts) {
                    this.setState({
                        noOwnPosts: true
                    })
                }
            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );


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
        ;



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
    }

    switchPosts = event => {
        this.setState({
            onFollowing: !this.state.onFollowing
        })

    }

    render() {
        return (
            < center >
                {this.state.onFollowing && <div className="feedOptions">
                    {(sessionStorage.getItem("language") != "spanish") && <button className="onFeedOption">Following</button>}
                    {(sessionStorage.getItem("language") == "spanish") && <button className="onFeedOption">Seguidos</button>}
                    {(sessionStorage.getItem("language") != "spanish") && <button className="nonFeedOption" onClick={this.switchPosts}>Everyone</button>}
                    {(sessionStorage.getItem("language") == "spanish") && <button className="nonFeedOption" onClick={this.switchPosts}>Todos</button>}
                </div>}
                {!this.state.onFollowing && <div className="feedOptions">
                    {(sessionStorage.getItem("language") != "spanish") && <button className="nonFeedOption" onClick={this.switchPosts}>Following</button>}
                    {(sessionStorage.getItem("language") == "spanish") && <button className="nonFeedOption" onClick={this.switchPosts}>Seguidos</button>}
                    {(sessionStorage.getItem("language") != "spanish") && <button className="onFeedOption" >Everyone</button>}
                    {(sessionStorage.getItem("language") == "spanish") && <button className="onFeedOption">Todos</button>}

                </div>}
                {this.state.onFollowing && this.state.noFollowing && this.state.noOwnPosts && (sessionStorage.getItem("language") != "spanish") && <p className="noPosts">No posts to show right now!</p>}
                {this.state.onFollowing && this.state.noFollowing && this.state.noOwnPosts && (sessionStorage.getItem("language") == "spanish") && <p className="noPosts">¡No hay ninguna publicación por mostrar!</p>}
                {this.state.posts.length == 0 && (sessionStorage.getItem("language") != "spanish") && <p>No posts to show right now!</p>}
                {this.state.posts.length == 0 && (sessionStorage.getItem("language") == "spanish") && <p>¡No hay ninguna publicación por mostrar!</p>}
                {!this.state.onFollowing &&
                    <div className="notOptions">
                        {this.state.everyonePosts.map(post => (
                            <React.Fragment>
                                {(sessionStorage.getItem("user") != post.user_id) && <form id="finishedPost">
                                    <div>

                                        <header className="navbar" id="postHeader" align='left' >{post.name}</header>
                                        {/* <font size="6" id="postName">First Last</font> - ----- this.profilePicture(post.user_id)*/}
                                        {this.state.profilePictureIndex_List[post["user_id"]] && <img src={this.state.profilePicList[this.state.profilePictureIndex_List[post["user_id"]]]} alt="Avatar" id="avatar" />}
                                        {!this.state.profilePictureIndex_List[post["user_id"]] && <img src={this.state.profilePicList[this.state.profilePictureIndex_List[post["user_id"]]]} alt="Avatar" id="avatar" />}
                                    </div>
                                    <br></br>
                                    <div className="picWLike">
                                        <div className="placeholderTextBox"><p className="postText">{post.post_text}</p></div>
                                        <Like />
                                    </div>
                                    <p id="timeStamp">{post.timestamp}</p>
                                    <CommentsSection
                                        posts={post.post_id} />
                                </form>}
                                {(sessionStorage.getItem("user") == post.user_id) && (post.post_type != "me") &&
                                    <form id="finishedPost">
                                        <div>

                                            <header className="navbar" id="postHeader" align='left' >{post.name}</header>
                                            {/* <font size="6" id="postName">First Last</font> */}
                                            {this.state.profilePictureIndex_List[post["user_id"]] && <img src={this.state.profilePicList[this.state.profilePictureIndex_List[post["user_id"]]]} alt="Avatar" id="avatar" />}
                                            {!this.state.profilePictureIndex_List[post["user_id"]] && <img src={Avatar} alt="Avatar" id="avatar" />}
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
                                    </form>}
                            </React.Fragment>
                        ))}
                    </div>}
                {/* } */}
                {this.state.onFollowing && <div className="notOptions">
                    {this.state.posts.map(post => (
                        <React.Fragment>
                            {this.state.followingIDs.includes(post.user_id) && (sessionStorage.getItem("user") != post.user_id) &&
                                <form id="finishedPost">
                                    <div>

                                        <header className="navbar" id="postHeader" align='left' >{post.name}</header>
                                        {/* <font size="6" id="postName">First Last</font> - ----- this.profilePicture(post.user_id)*/}
                                        {this.state.profilePictureIndex_List[post["user_id"]] && <img src={this.state.profilePicList[this.state.profilePictureIndex_List[post["user_id"]]]} alt="Avatar" id="avatar" />}
                                        {!this.state.profilePictureIndex_List[post["user_id"]] && <img src={this.state.profilePicList[this.state.profilePictureIndex_List[post["user_id"]]]} alt="Avatar" id="avatar" />}
                                    </div>
                                    <br></br>
                                    <div className="picWLike">
                                        <div className="placeholderTextBox"><p className="postText">{post.post_text}</p></div>
                                        <Like />
                                    </div>
                                    <p id="timeStamp">{post.timestamp}</p>
                                    <CommentsSection
                                        posts={post.post_id} />
                                </form>}
                            {/* {!this.state.onFollowing && (sessionStorage.getItem("user") != post.user_id) &&
                          } */}

                            {(sessionStorage.getItem("user") == post.user_id) && (post.post_type != "me") &&
                                <form id="finishedPost">
                                    <div>

                                        <header className="navbar" id="postHeader" align='left' >{post.name}</header>
                                        {/* <font size="6" id="postName">First Last</font> */}
                                        {this.state.profilePictureIndex_List[post["user_id"]] && <img src={this.state.profilePicList[this.state.profilePictureIndex_List[post["user_id"]]]} alt="Avatar" id="avatar" />}
                                        {!this.state.profilePictureIndex_List[post["user_id"]] && <img src={Avatar} alt="Avatar" id="avatar" />}
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
                                </form>}
                        </React.Fragment>
                    )
                    )}
                </div>}
            </center >
        );
    }
}
export default Feed;

