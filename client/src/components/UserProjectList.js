import React from "react";
import ProjectCard from './ProjectCard'
import '../App.css'

function UserProjectList({ user, onProjectButtonClick, userId, onUpdateProjectClick, onProjectCardClick, allUserProjects }) {

    return (
        <div>
            <h2>{user.username}'s Projects</h2>
            {allUserProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} onUpdateProjectClick={onUpdateProjectClick} onProjectCardClick={onProjectCardClick}/>)}
            {/* {user.projects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} onUpdateProjectClick={onUpdateProjectClick} followed={false} onProjectCardClick={onProjectCardClick}/>)}
            {user.followed_projects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={userId} followed={true} onProjectCardClick={onProjectCardClick}/>)} */}
        </div>
    )
}

export default UserProjectList