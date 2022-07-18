import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, FormField, Input } from "../styles";

function NavBar({ onLogoutClick, setSearch }) {

  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">The Cut List</Link>
      </Logo>
      <Nav>
      <Button as={Link} to="/">
          My Projects
        </Button>
      <Button as={Link} to="/projects">
          Available Projects
        </Button>
        <Button as={Link} to="/new">
          New Project
        </Button>
        <Button variant="outline" onClick={onLogoutClick}>
          Logout
        </Button>
      </Nav>
      <FormField >
        <Input type="text" placeholder="search" onChange={handleChange} />
      </FormField>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Arial";
  font-size: 3rem;
  color: rgb(223, 181, 29);
  margin: 0;
  line-height: 1;

  a {
    color: rgb(223, 181, 29);
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
