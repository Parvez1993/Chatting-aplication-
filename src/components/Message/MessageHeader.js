import React, { Component } from "react";
import { Header, Icon, Input, Segment } from "semantic-ui-react";

export default class MessageHeader extends Component {
  render() {
    return (
      <>
        {" "}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Header as="h2">
            Group
            <Icon name="star outline" color="black" />
            <Header as="h5">5 Users</Header>
          </Header>
          <div>
            {" "}
            <Input
              size="mini"
              icon="search"
              name="searchMessage"
              placeholder="search message"
            />
          </div>
        </div>
      </>
    );
  }
}
