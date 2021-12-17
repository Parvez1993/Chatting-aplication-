import React, { Component } from "react";
import { getAuth } from "@firebase/auth";
import { connect } from "react-redux";
import { setuser, removeUser } from "../../redux/actions";
import { Container, Dimmer, Grid, Loader, Segment } from "semantic-ui-react";
import { Navigate } from "react-router";
import { ColorPanel } from "../ColorPanel";
import SidePanel from "../SidePanel";
import Message from "../Message";
import MetaPanel from "../MetaPanel";
class Home extends Component {
  componentDidMount() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setuser(user);
      } else {
        this.props.removeUser();
        <Navigate to="/login" />;
      }
    });
  }

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Segment>
            <Dimmer active style={{ height: "100vh" }}>
              <Loader size="massive">Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <Grid columns="equal" style={{ marginTop: "3px" }}>
            <Grid.Column width={1} style={{ padding: "0rem", zIndex: "-1" }}>
              <ColorPanel userName={this.props.userName.displayName} />
            </Grid.Column>{" "}
            <Grid.Column width={2} style={{ padding: "0rem", zIndex: "1" }}>
              <SidePanel userName={this.props.userName.displayName} />
            </Grid.Column>{" "}
            <Grid.Column width={10} style={{ padding: "0rem" }}>
              <div>
                <Message />
              </div>
            </Grid.Column>{" "}
            <Grid.Column width={2} style={{ padding: "0rem" }}>
              <MetaPanel />
            </Grid.Column>
          </Grid>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  userName: state.user.currentUser,
});

export default connect(mapStateToProps, { setuser, removeUser })(Home);
