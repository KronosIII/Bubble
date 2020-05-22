import React, { Component } from 'react';
import Trash from "../trash.png"

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteComment(commentid) {

        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "deletePosts",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                postid: commentid
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
            )
            .then(window.location.reload())
        // this.loadPosts();
    }

    render() {
        return (
            <div id="commentRectangle">
                <h5 id="commenter">{this.props.name}</h5>
                <p id="literalComment">{this.props.post}</p>
                <p id="literalComment">{this.props.time}</p>
                {this.props.user_id == sessionStorage.getItem("user") && <input type="image" src={Trash} onClick={() => this.deleteComment(this.props.commentid)} className="deleteCommentPointer" alt="trash" />}
            </div>
        );
    }
}

export default Comment;