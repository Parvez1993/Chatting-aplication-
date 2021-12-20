import React, { Component } from "react";
import { Input, Message } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  child,
} from "@firebase/database";
export default class MessageForm extends Component {
  state = {
    message: "",
    err: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleMsgSubmit = () => {
    if (this.state.message) {
      const db = getDatabase();
      const postListRef = ref(db, "messages");
      const newPostRef = push(child(postListRef, `${this.props.groupName.id}`));
      set(newPostRef, {
        message: this.state.message,
        date: Date(),
        sender: this.props.userName.uid,
        group: this.props.groupName.id,
        username: this.props.userName.displayName,
      }).then(() => {
        this.setState({ message: "" });
      });
      this.setState({ err: "" });
    } else {
      this.setState({ err: "Add a message" });
    }
  };
  render() {
    return (
      <div>
        <Input
          type="text"
          placeholder="Type your message"
          style={{ width: "100%" }}
          onChange={this.handleChange}
          name="message"
        />

        {this.state.err ? (
          <Message negative>
            <Message.Header>{this.state.err}</Message.Header>
          </Message>
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Button
            onClick={this.handleMsgSubmit}
            content="Add Message"
            primary
            style={{ width: "40%" }}
          />
          <Button content="Add Media" secondary style={{ width: "40%" }} />
        </div>
      </div>
    );
  }
}
