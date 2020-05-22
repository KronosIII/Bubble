import React, { Component } from 'react';
import OtherPersonPost from "./OtherPersonPost"

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            post: [],
        }
    }

    componentDidMount() {

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getUsers",
                userid: sessionStorage.getItem("otherUserID")
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.users) {
                    this.setState({
                        name: result["users"][0].name

                    });
                }
            })
    }

    render() {
        return (
            <div id="otherPersonPosts" >
                {(sessionStorage.getItem("language") != "spanish") && <h2 className="yourPosts">{this.state.name}'s Posts</h2>}
                {(sessionStorage.getItem("language") == "spanish") && <h2 className="yourPosts">Publicaciones de {this.state.name}</h2>}
                <div id="profilePosts">
                    <OtherPersonPost />
                </div>
            </div>
        );
    }
}

export default Posts;