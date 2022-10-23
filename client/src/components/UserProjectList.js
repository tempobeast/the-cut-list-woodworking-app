import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function UserProjectList({ user, onProjectButtonClick, userId, onUpdateProjectClick, onProjectCardClick, search }) {

    const filterUserProjects = user.user_related_projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>{user.username}'s Projects</h2>
            <div className="project-container">
                {filterUserProjects.length > 0 ? filterUserProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} onUpdateProjectClick={onUpdateProjectClick} onProjectCardClick={onProjectCardClick}/>) : <p>No projects match this search</p>}
            </div>
        </div>
    )
}

export default UserProjectList