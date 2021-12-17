import React, { Component } from "react";
import { Comment, Segment } from "semantic-ui-react";
import MessageHeader from "./Message/MessageHeader";
import MessageForm from "./MessageForm";
export default class Message extends Component {
  render() {
    return (
      <div>
        <MessageHeader />
        <Segment>
          <Comment.Group></Comment.Group>
          <MessageForm />
        </Segment>
      </div>
    );
  }
}
