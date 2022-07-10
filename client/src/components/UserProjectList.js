import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function UserProjectList({ user, onProjectButtonClick }) {



    return (
        <div>
            <h2>{user.username}'s Projects</h2>
            {user.projects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} id="user_authored_project" />)}
            {user.followed_projects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} id="followed_project" />)}
        </div>
    )
}

export default UserProjectList