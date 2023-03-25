import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Logo from "../assets/Logo.png";
function Header() {
  return (
    <>
      <Navbar style={{ background: "white" }}>
        <Container>
          <Navbar.Brand href="/">
            <img alt="" src={Logo} className="d-inline-block align-top" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
