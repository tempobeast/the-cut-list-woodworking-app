import React, { useContext } from "react";
import ProjectCard from './ProjectCard';
import { UserContext } from "../context/user";
import { SearchContext } from "../context/search";
import SearchFilter from "./SearchFilter";
import '../App.css';

function UserProjectList({ onProjectButtonClick }) {

    const { user } = useContext(UserContext)
    const { search } = useContext(SearchContext) 
    const filterUserProjects = user.user_related_projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2 className="projects-title">{user.username}'s Projects</h2>
            <SearchFilter />
            <div className="project-container">
                {filterUserProjects.length > 0 ? filterUserProjects.map((project) => <ProjectCard project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} />) : <p>No projects match this search</p>}
            </div>
        </div>
    )
}

export default UserProjectList