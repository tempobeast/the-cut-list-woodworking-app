import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, FormField, Input } from "../styles";
import '../App.css';


function NavBar({ onLogoutClick, setSearch }) {

  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div>
      
        <Logo>
          <Link to="/">
            <img className="logo"src="/CutListLogo-01.png" alt="The Cut List"/>
          </Link>
        </Logo>
        <Wrapper>
        <Nav>
        <Button as={Link} to="/">
            My Projects
          </Button>
        <Button as={Link} to="/available_projects">
            Available Projects
          </Button>
          <Button as={Link} to="/new_project">
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
    </div>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
width: "50%"

`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
