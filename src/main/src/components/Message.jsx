import React, { Component } from 'react';

class Message extends Component {
    state = {}
    render() {
        return (
            <div id="messageRectangle">
                {this.props.children}
                <h5 id="messager">First Last</h5>
                <p id="literalMessage">Message blah blah blah blah blah</p>
            </div>
        );
    }
}

export default Message;