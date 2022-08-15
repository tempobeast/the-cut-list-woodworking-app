import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function AvailableProjectList({ projects, onProjectButtonClick, search, onProjectCardClick, user }) {

    const allUserProjects = []
    user.projects.map((project) => allUserProjects.push(project.id))
    user.followed_projects.map((project) => allUserProjects.push(project.id))
    
    const filterNonUserProjects = projects
    .filter((project) => !allUserProjects.includes(project.id))
    .filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Available Projects:</h2>
            {filterNonUserProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={user.id} followed={false} onProjectCardClick={onProjectCardClick}/>)}
        </div>
    )
}

export default AvailableProjectList