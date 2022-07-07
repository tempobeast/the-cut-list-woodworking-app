import React from "react";
import ProjectCard from './ProjectCard'

function ProjectList({user}) {

    const userProjectList = user.projects.map((project) => <ProjectCard project={project}/>)

    return (
        <>
            <h2>{user.username}'s Projects</h2>
            {userProjectList}
        </>
    )
}

export default ProjectList