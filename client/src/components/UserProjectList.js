import React, { useContext } from "react";
import ProjectCard from './ProjectCard';
import { UserContext } from "../context/user";
import '../App.css';

function UserProjectList({ onProjectButtonClick, onUpdateProjectClick, onProjectCardClick, search }) {

    const { user } = useContext(UserContext)
    const filterUserProjects = user.user_related_projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>{user.username}'s Projects</h2>
            <div className="project-container">
                {filterUserProjects.length > 0 ? filterUserProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} userId={user.id} onUpdateProjectClick={onUpdateProjectClick} onProjectCardClick={onProjectCardClick}/>) : <p>No projects match this search</p>}
            </div>
        </div>
    )
}

export default UserProjectList