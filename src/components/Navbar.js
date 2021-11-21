import React from "react";
import { Container } from "semantic-ui-react";
import styled from "styled-components";
function Navbar() {
  return (
    <>
      <Wrapper>
        <div className="navbar">
          <Container>
            <div className="main">
              <div className="logo">
                <h2>Gossip Zone</h2>
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
