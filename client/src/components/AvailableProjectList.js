import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function AvailableProjectList({ projects, onProjectButtonClick, search, onProjectCardClick, user }) {

    const filterNonUserProjects = projects
    .filter((project) => project.user_id !== user.id)
    .filter((project) => project.follows.find((follow) => follow.user_id !== user.id) || project.follows < 1)
    .filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Available Projects:</h2>
            {filterNonUserProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={user.id} followed={false} onProjectCardClick={onProjectCardClick}/>)}
        </div>
    )
}

export default AvailableProjectList