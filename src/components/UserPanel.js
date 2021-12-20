import { getAuth, signOut } from "@firebase/auth";
import React, { Component } from "react";
import { Dropdown, Grid, Header } from "semantic-ui-react";
import { removeUser } from "../redux/actions";
import { Navigate } from "react-router-dom";

export default class UserPanel extends Component {
  dropDownOptions = () => [
    { text: <span>{this.props.userName}</span>, disabled: true },
    { text: "Change Pro Pic" },
    { text: <span onClick={this.handleLogout}>"Signout"</span> },
  ];

  render() {
    console.log(this.props.userName);
    this.handleLogout = async (e) => {
      const auth = getAuth();
      await signOut(auth)
        .then(() => {
          <Navigate to="/login" />;
        })
        .catch((err) => console.log(err));
    };
    return (
      <>
        <Grid>
          <Grid.Column>
            <Header
              as="h2"
              style={{ color: "white", marginLeft: "40px", marginTop: "10px" }}
            ></Header>
            <Header as="h3" style={{ color: "white" }}>
              <Dropdown
                trigger="User"
                options={this.dropDownOptions()}
              ></Dropdown>
            </Header>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
