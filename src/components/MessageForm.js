import React, { Component } from "react";
import { Input } from "semantic-ui-react";

export default class MessageForm extends Component {
  render() {
    return (
      <div>
        <Input type="text" placeholder="Type your message" />
      </div>
    );
  }
}
