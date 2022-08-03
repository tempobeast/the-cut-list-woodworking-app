import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function UserProjectList({ user, onProjectButtonClick, userId, onUpdateProjectClick, onProjectCardClick, search }) {

    const userProjects = [...user.projects, ...user.followed_projects]
    const filterUserProjects = userProjects.filter((project) => project.title.toLowerCase().startsWith(search.toLowerCase()))

    
    return (
        <div>
            <h2>{user.username}'s Projects</h2>
            {filterUserProjects.length > 0 ? filterUserProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} onUpdateProjectClick={onUpdateProjectClick} onProjectCardClick={onProjectCardClick}/>) : <p>No projects match this search</p>}
            {/* {user.projects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} onUpdateProjectClick={onUpdateProjectClick} followed={false} onProjectCardClick={onProjectCardClick}/>)}
            {user.followed_projects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} followed={true} onProjectCardClick={onProjectCardClick}/>)} */}
        </div>
    )
}

export default UserProjectList