import React, { useContext } from "react";
import ProjectCard from './ProjectCard';
import { UserContext } from "../context/user";
import { ErrorsContext } from "../context/errors"
import '../App.css';

function UserProjectList({ onProjectButtonClick, search, setSearch }) {

    const { user } = useContext(UserContext)
    const { errors } = useContext(ErrorsContext)
    const filterUserProjects = user.user_related_projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    function handleChange(e) {
        setSearch(e.target.value)
      }

    return (
        <div>
            
            <h2 className="projects-title">{user.username}'s Projects</h2>
            <form >
                <input type="text" placeholder="search" className="projects-header" onChange={handleChange} />
            </form>
            <div className="project-container">
                {filterUserProjects.length > 0 ? filterUserProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} />) : <p>No projects match this search</p>}
            </div>
        </div>
    )
}

export default UserProjectList