import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function AvailableProjectList({ projects, onProjectButtonClick, search, onProjectCardClick, user }) {
    console.log(user.id)
    console.log(projects)

    const allUserProjects = []
    user.projects.map((project) => allUserProjects.push(project.id))
    user.followed_projects.map((project) => allUserProjects.push(project.id))
    
    console.log(allUserProjects)


    const filterNonUserProjects = projects
    // .filter((project) => project.user_id !== user.id)
    .filter((project) => !allUserProjects.includes(project.id))
    .filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    console.log(projects)
    console.log(filterNonUserProjects)
    console.log(user.id)

    return (
        <div>
            <h2>Available Projects:</h2>
            {filterNonUserProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={user.id} followed={false} onProjectCardClick={onProjectCardClick}/>)}
        </div>
    )
}

export default AvailableProjectList