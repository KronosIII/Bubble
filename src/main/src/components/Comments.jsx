import React, { Component } from 'react';
import Comment from "./Comment"

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentPosts: []
        };
    }
    componentDidMount() {
        //  console.log("Parent Id = " + this.props.post);
        fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
                action: "getPosts",
                parentid: this.props.post
            }),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.posts) {

                        this.setState({
                            commentPosts: result.posts,
                        });
                        // console.log(this.props.post.post_id);
                    }
                },
                (error) => {
                    alert("error!");
                }
            );
    }

    render() {
        const { error, isLoaded, commentPosts } = this.state;
        //         // const comments = "eee";
        //         //         const commentRenders = []
        //         //         for (var comment of comments.comments) {
        //         //             console.log(comment);
        //         //             commentRenders.push(<Comment/>)
        //         // }
        return (
            <div className="comments" id="comments">

                <p align="left" id="caption">Write a Caption here</p>
                <hr></hr>
                {this.state.commentPosts.map(posts =>
                    <React.Fragment>
                        {posts.post_text && < Comment
                            name={posts.name}
                            post={posts.post_text}
                            time={posts.timestamp}
                            user_id={posts.user_id}
                            commentid={posts.post_id}
                        />}
                        {/* <button className="deleteCommentPointer">‣</button> */}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default Comments;