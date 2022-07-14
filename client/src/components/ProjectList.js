import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function ProjectList({ user, onProjectButtonClick, filteredAvailableProjects, userId }) {

    // function combineAuthoredAndFollowed() {
    //     const { projects, followed_projects } = user
    //     const allUserProjects = [];
    //     if (user) {
    //         projects.map((proj) => allUserProjects.push(proj))
    //         followed_projects.map((proj) => allUserProjects.push(proj))
    //         return allUserProjects
    //     }
    //     else {
    //         return null
    //     }
    // } 
    

    // const projectsToDisplay = (projArray) => {
    //     if (filteredAvailableProjects) {
    //         return filteredAvailableProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} />)
    //     } else {
    //         return projArray.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} />)
    //     }
    // }

    return (
        <div>
            <h2>{user ? `${user.username}'s Projects` : "All Available Projects"}</h2>
        </div>
    )
}

export default ProjectList