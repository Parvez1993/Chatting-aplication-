import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "@firebase/auth";
import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import img from "../images/signin.png";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "./config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Anime from "./Anime";
export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errMesg: "",
    success: "",
    loading: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formValidation = ({ username, email, password, confirmPassword }) => {
    if (!username || !email || !password || !confirmPassword) {
      this.setState({ errMesg: "Please fill all the forms" });
    } else if (password.length < 8) {
      this.setState({ errMesg: "Password too weak" });
    } else if (password !== confirmPassword) {
      this.setState({ errMesg: "Passwrod do not match" });
    } else {
      return true;
    }
    this.setState({ loading: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const auth = getAuth();
    if (this.formValidation(this.state)) {
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: this.state.username,
            // photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              this.writeUserData(userCredential);
            })
            .then(() => {
              this.setState({ username: "" });
              this.setState({ email: "" });
              this.setState({ password: "" });
              this.setState({ confirmPassword: "" });
              this.setState({ errMesg: "" });
              this.setState({ success: "Account created successfully" });
              this.setState({ loading: false });
            })
            .catch((error) => {
              this.setState({ loading: false });
              const errorCode = error.code;
              if (errorCode) {
                this.setState({ errorMesg: "username already in use" });
              }
            });
        })

        .catch((error) => {
          this.setState({ loading: false });
          const errorCode = error.code;
          if (errorCode.includes("email")) {
            this.setState({ errorMesg: "email already in use" });
          }
        });
    }
  };

  writeUserData = (user) => {
    const db = getDatabase();
    set(ref(db, "users/" + user.user.uid), {
      username: this.state.username,
    });
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      errMesg,
      success,
      loading,
    } = this.state;

    return (
      <>
        <Container>
          {" "}
          <Wrapper>
            {" "}
            <Grid
              columns={2}
              padded="vertically"
              className="ui center aligned grid"
            >
              <Grid.Column style={{ maxWidth: 600 }} className="columnOne">
                <Header as="h3" icon textAlign="center">
                  <Icon name="sign-in" className="icon_header" />
                  <Header.Content>Register</Header.Content>
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
                    <Form.Field>
                      <label>Username</label>
                      <input
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                        placeholder="username"
                        value={username}
                      />
                    </Form.Field>
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
                    <Form.Field>
                      <label>Confirm Password</label>
                      <input
                        placeholder="confirm password"
                        name="confirmPassword"
                        type="password"
                        onChange={this.handleChange}
                        value={confirmPassword}
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
                <Segment>
                  Already have an account <Link to="/login">Click here</Link>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Anime image={img} />
              </Grid.Column>
            </Grid>
          </Wrapper>
        </Container>
      </>
    );
  }
}

const Wrapper = styled.div`
  .icon_header {
    color: var(--blue);
  }
  .columnOne {
    margin: auto 0;
  }
  Button {
    background: var(--blue) !important;
    display: flex;
    width: 100%;
    color: white !important;
  }
`;
