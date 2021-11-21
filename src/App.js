import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/components/Home";
import React, { Component } from "react";
import { getAuth } from "@firebase/auth";
import Navbar from "./components/Navbar";

export default class App extends Component {
  state = {
    tracker: false,
  };
  componentDidMount() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ tracker: true });
      } else {
        this.setState({ tracker: false });
      }
      console.log(this.state.tracker);
    });
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          {this.state.tracker ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Signin />} />
            </Routes>
          )}
        </BrowserRouter>
      </>
    );
  }
}
