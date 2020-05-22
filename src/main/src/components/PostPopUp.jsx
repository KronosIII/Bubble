import React from "react";
import '../styles.css';
import Sidebar from "react-sidebar";
import Folder from "./file.png"

class PostPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            postSent: false,
            postText: '',

            postType: "myFollowers",

            profilePicIndex: ""

        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.textEntryHandler = this.textEntryHandler.bind(this);
        this.submitPostHandler = this.submitPostHandler.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({
            sidebarOpen: open
        });
    }

    textEntryHandler(event) {
        this.setState({
            postText: event.target.value
        });
    };


    mePrivacy = event => {
        this.setState({
            postType: "me"
        })

    }

    followersPrivacy = event => {
        this.setState({
            postType: "myFollowers"
        })

    }

    everyonePrivacy = event => {
        this.setState({
            postType: "everyone"
        })

    }

    getPosts(blockedIDs) {
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
    }



    submitPostHandler(event) {

        event.preventDefault();
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "addOrEditPosts",
                user_id: sessionStorage.getItem("user"),
                userid: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                posttype: this.state.postType,
                posttext: this.state.postText,
                timestamp: dateTime
            })
        })

        // .then(window.location.reload())
        // 
    }


    render() {
        return (
            <React.Fragment>

                <Sidebar
                    id="postOverlay"
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "lightgray" } }}
                    sidebar={
                        <b>{(sessionStorage.getItem("language") != "spanish") && <button
                            onClick={() => {
                                this.setState({ sidebarOpen: false })
                                this.setState({ postText: this.state.postText });
                            }}
                            id="cancelMakePost">
                            Cancel
                        </button>}
                            {(sessionStorage.getItem("language") == "spanish") && <button
                                onClick={() => {
                                    this.setState({ sidebarOpen: false })
                                    this.setState({ postText: this.state.postText });
                                }}
                                id="cancelMakePost">
                                Cancelar
                        </button>}
                            <center>
                                <form id="post">
                                    <div>
                                        {(sessionStorage.getItem("language") != "spanish") && <textarea onChange={this.textEntryHandler} value={this.state.postText} rows="10" cols="30" className="TextArea1" id="postBox" placeholder="Make a post..."></textarea>}
                                        {(sessionStorage.getItem("language") == "spanish") && <textarea onChange={this.textEntryHandler} value={this.state.postText} rows="10" cols="30" className="TextArea1" id="postBox" placeholder="Crear una publicación..."></textarea>}
                                        <br />
                                        <div >
                                            {(sessionStorage.getItem("language") != "spanish") && <p className="privacy">Privacy</p>}
                                            {(sessionStorage.getItem("language") == "spanish") && <p className="privacy">Privicidad</p>}
                                            {(sessionStorage.getItem("language") != "spanish") && <p className="privacy">My posts will be posted to:</p>}
                                            {(sessionStorage.getItem("language") == "spanish") && <p className="privacy">Mis publicaciones serán publicadas a:</p>}
                                            {(this.state.postType == "everyone") && <div className="privacyOptions">
                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.everyonePrivacy} className="selectedPrivacy">Everyone</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.everyonePrivacy} className="selectedPrivacy">Todos</button>}

                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.followersPrivacy} className="nonselectedPrivacy">My Followers</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.followersPrivacy} className="nonselectedPrivacy">Mis Seguidores</button>}
                                                {/* <a href="#">Friends</a> */}
                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.mePrivacy} className="nonselectedPrivacy">My Profile Only</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.mePrivacy} className="nonselectedPrivacy">Solo mi perfil</button>}
                                            </div>}
                                            {(this.state.postType == "myFollowers") && <div className="privacyOptions">
                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.everyonePrivacy} className="nonselectedPrivacy">Everyone</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.everyonePrivacy} className="nonselectedPrivacy">Todos</button>}

                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.followersPrivacy} className="selectedPrivacy">My Followers</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.followersPrivacy} className="selectedPrivacy">Mis Seguidores</button>}
                                                {/* <a href="#">Friends</a> */}
                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.mePrivacy} className="nonselectedPrivacy">My Profile Only</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.mePrivacy} className="nonselectedPrivacy">Solo mi perfil</button>}
                                            </div>}
                                            {(this.state.postType == "me") && <div className="privacyOptions">
                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.everyonePrivacy} className="nonselectedPrivacy">Everyone</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.everyonePrivacy} className="nonselectedPrivacy">Todos</button>}

                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.followersPrivacy} className="nonselectedPrivacy">My Followers</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.followersPrivacy} className="nonselectedPrivacy">Mis Seguidores</button>}
                                                {/* <a href="#">Friends</a> */}
                                                {(sessionStorage.getItem("language") != "spanish") && <button onClick={this.mePrivacy} className="selectedPrivacy">My Profile Only</button>}
                                                {(sessionStorage.getItem("language") == "spanish") && <button onClick={this.mePrivacy} className="selectedPrivacy">Solo mi perfil</button>}
                                            </div>}
                                        </div>
                                        {/* <button id="makeFileButton">
                                            <center><img src={Folder} alt="folder" width="50px;" height="50px;" className="makeFolder"></img></center>
                                        </button> */}
                                        <div class="wrapper">
                                            <span />
                                            {(sessionStorage.getItem("language") != "spanish") && <input onClick={(event) => { this.submitPostHandler(event); this.onSetSidebarOpen(false) }} id="sendButton" type="submit" value="Send" name="PostContent" height="45px;" />}
                                            {(sessionStorage.getItem("language") == "spanish") && <input onClick={(event) => { this.submitPostHandler(event); this.onSetSidebarOpen(false) }} id="sendButton" type="submit" value="Publicar" name="PostContent" height="45px;" />}
                                        </div>
                                    </div>
                                </form>
                            </center>
                        </b>}
                >
                    {(sessionStorage.getItem("language") != "spanish") && <button onClick={() => this.onSetSidebarOpen(true)} id="postingButton">Make a Post</button>}
                    {(sessionStorage.getItem("language") == "spanish") && <button onClick={() => this.onSetSidebarOpen(true)} id="postingButton">Crear una publicación</button>}
                </Sidebar>
            </React.Fragment>
        );
    }
}


export default PostPopUp;