import React, { Component } from 'react';
import Heart from "./heart.png"

class Like extends Component {
    state = {
        count: 0
    }
    handleLike = () => {
        this.setState({ count: this.state.count + 1 });
    };
    render() {
        return (
            <button className="bottom-right" onClick={this.handleLike}>
                <img src={Heart} alt="heart" width="25px;" height="25px;" id="heart" />
                {this.state.count}
            </button>
        );
    }
}

export default Like;