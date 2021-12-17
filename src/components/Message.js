import React, { Component } from "react";
import { Comment, Segment } from "semantic-ui-react";
import MessageHeader from "./Message/MessageHeader";
import MessageForm from "./MessageForm";
export default class Message extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Segment>
          <MessageHeader />
        </Segment>

        <Segment style={{ height: "550px", overflowY: "scroll" }}>
          <Comment.Group></Comment.Group>
        </Segment>
        <Segment>
          <MessageForm />
        </Segment>
      </div>
    );
  }
}
