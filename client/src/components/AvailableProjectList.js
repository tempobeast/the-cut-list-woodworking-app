import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function AvailableProjectList({ projects, onProjectButtonClick, search, onProjectCardClick, user }) {

    const filterProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Available Projects:</h2>
            <div className="project-container">
            {filterProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={user.id} followed={false} onProjectCardClick={onProjectCardClick}/>)}
            </div>
        </div>
    )
}

export default AvailableProjectList