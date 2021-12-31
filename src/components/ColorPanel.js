import React, { Component } from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
export class ColorPanel extends Component {
  render() {
    return (
      <Sidebar.Pushable as={Segment} style={{ margin: "0px 20px" }}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >
          <Menu.Item as="a">
            <Icon name="add" />
            add
          </Menu.Item>
        </Sidebar>
      </Sidebar.Pushable>
    );
  }
}

export default ColorPanel;
