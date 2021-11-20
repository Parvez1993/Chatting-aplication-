import { thisExpression } from "@babel/types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { errorPrefix } from "@firebase/util";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
  Button,
  Form,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";

export default class Signin extends Component {
  state = {
    email: "",
    password: "",
    errMesg: "",
    success: "",
    loading: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formValidation = ({ email, password }) => {
    if (!email || !password) {
      this.setState({ errMesg: "Please fill all the forms" });
    } else if (password.length < 8) {
      this.setState({ errMesg: "Password wrong" });
    } else {
      return true;
    }
    this.setState({ loading: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.formValidation(this.state)) {
      this.setState({ loading: true });
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          console.log(userCredential);
          this.setState({ success: "Welcome user" });
          this.setState({ loading: false });
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes("user")) {
            this.setState({ errMesg: "user doesnot exists" });
          }
          if (errorCode.includes("wrong-password")) {
            this.setState({ errMesg: "Password not correct" });
          }
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const { email, password, errMesg, success, loading } = this.state;

    return (
      <>
        <Grid verticalAlign="center">
          <Grid.Column style={{ maxWidth: 400 }}>
            <Header as="h2" icon textAlign="center">
              <Icon name="sign-in" />
              <Header.Content>Login or Register</Header.Content>
            </Header>
            {errMesg ? (
              <Message warning floating>
                {errMesg}
              </Message>
            ) : (
              ""
            )}
            {success ? (
              <Message success floating>
                {success}
              </Message>
            ) : (
              ""
            )}
            <Segment raised>
              <Form style={{ textAlign: "left" }}>
                <Form.Field
                  className={errMesg.includes("email") ? "error" : ""}
                >
                  <label>Email</label>
                  <input
                    placeholder="email"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                    value={email}
                  />
                </Form.Field>
                <Form.Field
                  className={errMesg.includes("Password") ? "error" : ""}
                >
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    placeholder="password"
                    value={password}
                  />
                </Form.Field>
                <Button
                  className={loading ? "loading primary" : ""}
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Segment>
            Dont have an account <Link to="/signin">Click here</Link>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
