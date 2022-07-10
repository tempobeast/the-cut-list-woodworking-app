import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function AvailableProjectList({ projects, onProjectButtonClick }) {

    return (
        <div>
            <h2>Available Projects</h2>
            {projects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} id="all_projects" />)}
        </div>
    )
}

export default AvailableProjectList