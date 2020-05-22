import React, { Component } from 'react';


class MyMessage extends Component {
    state = {
        message: "Message blah blah blah blah blah"
    }
    render() {
        return (
            <div>
                {/* {this.props.children}
                <h5 id="myMessager">First Last</h5>
                <p id="myLiteralMessage">{this.state.message}</p> */}
            </div>
        )
    }
}

export default MyMessage;