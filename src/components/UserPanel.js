import { getAuth, signOut } from "@firebase/auth";
import React, { Component } from "react";
import { Button, Dropdown, Grid, Header, Icon, Modal } from "semantic-ui-react";
import { removeUser } from "../redux/actions";
import { Navigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

export default class UserPanel extends Component {
  state = {
    modal: false,
  };
  dropDownOptions = () => [
    { text: <span>{this.props.userName}</span>, disabled: true },
    {
      text: (
        <Button
          content="Change Profile "
          style={{ width: "40%" }}
          onClick={this.openModal}
        />
      ),
    },
    { text: <span onClick={this.handleLogout}>"Signout"</span> },
  ];

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  //modal

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
              style={{
                color: "white",
                marginLeft: "40px",
                marginTop: "10px",
              }}
            ></Header>
            <Header as="h3" style={{ color: "white" }}>
              <Dropdown
                trigger="User"
                options={this.dropDownOptions()}
              ></Dropdown>
            </Header>
          </Grid.Column>
        </Grid>

        {/* //modal */}
        <ProfileModal
          modal={this.state.modal}
          close={this.closeModal}
          username={this.props.user}
        />
      </>
    );
  }
}
