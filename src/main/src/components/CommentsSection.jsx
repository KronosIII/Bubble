import React, { Component } from 'react';
import Comments from "./Comments"

class CommentsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_text: ""
        };
        this.SubmitCommentHandler = this.SubmitCommentHandler.bind(this);
    }

    SubmitCommentHandler = (event) => {
        event.preventDefault();
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "addOrEditPosts",
                user_id: sessionStorage.getItem("user"),
                userid: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                posttype: "Comment",
                posttext: this.state.commentText,
                parentid: this.props.posts,
            }),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        post_text: ""
                    })
                },
                (error) => {
                    // alert("error!");
                }
            )
            .then(window.location.reload())
    };

    CommentText_Handler = (event) => {
        this.setState({
            commentText: event.target.value
        });
    };

    componentDidMount() {
        // console.log(this.props.post);
    }

    render() {
        // console.log("The Post = " +this.props.posts)
        return (
            <form onSubmit={this.SubmitCommentHandler}>
                <div className="rectangle">
                    {(sessionStorage.getItem("language") != "spanish") && <header id="commentsHeader" align='left' >Comments</header>}
                    {(sessionStorage.getItem("language") == "spanish") && <header id="commentsHeader" align='left' >Comentarios</header>}
                    <Comments

                        post={this.props.posts}
                    // comments={this.state.comments}
                    // onNewComment={this.handleNewComment}
                    />
                    <div className="commenting">
                        {(sessionStorage.getItem("language") != "spanish") && <textarea rows="3" cols="30" id="commentArea" placeholder="Make a Comment..."
                            onChange={this.CommentText_Handler}>

                        </textarea>}
                        {(sessionStorage.getItem("language") == "spanish") && <textarea rows="3" cols="30" id="commentArea" placeholder="Escribe un comentario..."
                            onChange={this.CommentText_Handler} >

                        </textarea>}

                        <div class="center" className="wrapperComment">
                            <span />
                            {(sessionStorage.getItem("language") != "spanish") && <center><input id="sendComment" type="submit" value="Send" name="PostContent" /></center>}
                            {(sessionStorage.getItem("language") == "spanish") && <center><input id="sendComment" type="submit" value="Publicar" name="PostContent" /></center>}
                        </div>
                    </div>

                </div>
            </form>
        );
    }
}

export default CommentsSection;
