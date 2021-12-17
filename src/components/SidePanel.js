import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Groups from "./Groups";
import UserPanel from "./UserPanel";

export default class SidePanel extends Component {
  render() {
    return (
      <>
        <Menu
          size="large"
          vertical
          style={{ background: "var(--blue)", height: "100vh" }}
        >
          <UserPanel userName={this.props.userName} />
          <Groups userName={this.props.userName} />
        </Menu>
      </>
    );
  }
}
