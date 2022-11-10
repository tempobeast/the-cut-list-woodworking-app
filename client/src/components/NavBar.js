import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import '../App.css';
import { ProjectToUpdateContext } from "../context/projectToUpdate";
import { ProjectsContext } from "../context/projects";
import { UserContext } from "../context/user"


function NavBar() {

  const { setProjectToUpdate } = useContext(ProjectToUpdateContext)
  const { setProjects } = useContext(ProjectsContext)
  const { setUser } = useContext(UserContext)

  function onLogoutClick(e) {
    fetch("/logout", 
    { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        setProjects([])
      }
    });
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
        <Button as={Link} to="/available_projects" >
            Available Projects
          </Button>
          <Button as={Link} to="/new_project" onClick={() => setProjectToUpdate('')}>
            New Project
          </Button>
          <Button variant="outline" onClick={onLogoutClick}>
            Logout
          </Button>
        </Nav>
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
