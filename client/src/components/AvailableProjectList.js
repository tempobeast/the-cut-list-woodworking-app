import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function AvailableProjectList({ projects, onProjectButtonClick, userId, search, onProjectCardClick }) {

    const filterUserProjects = projects
    .filter((project) => project.user_id !== userId)
    .filter((project) => project.follows < 1 || project.follows.find((follow) => follow.user_id !== userId))
    .filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Available Projects:</h2>
            {filterUserProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} followed={false} onProjectCardClick={onProjectCardClick}/>)}
        </div>
    )
}

export default AvailableProjectList