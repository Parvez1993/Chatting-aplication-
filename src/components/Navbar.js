import React, { useEffect } from "react";
import { Container, Button, Image } from "semantic-ui-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { removeUser } from "../redux/actions/index";

function Navbar() {
  const auth = getAuth();

  const signUserOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth).then(() => {
        <Navigate to="/login" />;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cuurentUser = useSelector((item) => item.user.currentUser);
  console.log(cuurentUser);
  return (
    <>
      <Wrapper>
        <div className="navbar">
          <Container>
            <div className="main">
              <div className="logo">
                <h2>Gossip Zone</h2>
              </div>
              <div>
                {cuurentUser ? (
                  <Image
                    src={cuurentUser.photoURL}
                    alt={cuurentUser.displayName}
                    avatar
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="signOut">
                {cuurentUser ? (
                  <Button onClick={signUserOut}>Signout</Button>
                ) : (
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .navbar {
    background: var(--blue);

    .main {
      display: flex;
      height: 50px;
      align-items: center;
      color: var(--white);
      justify-content: space-between;
    }
  }
`;

export default Navbar;
