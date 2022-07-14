import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function AvailableProjectList({ projects, onProjectButtonClick, userId }) {

    const filterUserProjects = projects
    .filter((project) => project.user_id !== userId)
    .filter((project) => project.follows < 1 || project.follows.find((follow) => follow.user_id !== userId))

    return (
        <div>
            <h2>Available Projects:</h2>
            {filterUserProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} followed={false} />)}
        </div>
    )
}

export default AvailableProjectList