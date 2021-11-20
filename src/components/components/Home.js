import React, { Component } from "react";
import { getAuth } from "@firebase/auth";
import { connect } from "react-redux";
import { setuser } from "../../redux/actions";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

class Home extends Component {
  componentDidMount() {
    console.log(this.props.isLoading);
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setuser(user);
      } else {
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
          "owwww"
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, { setuser })(Home);
