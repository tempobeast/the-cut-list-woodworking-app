import React, { useContext } from "react";
import ProjectCard from './ProjectCard'
import '../App.css'
import { ProjectsContext } from "../context/projects";
import { SearchContext } from "../context/search";
import SearchFilter from "./SearchFilter";

function AvailableProjectList({ onProjectButtonClick }) {

    const { projects } = useContext(ProjectsContext)
    const { search } = useContext(SearchContext)
    const filterProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Available Projects:</h2>
            <SearchFilter />
            <div className="project-container">
            {filterProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} followed={false} />)}
            </div>
        </div>
    )
}

export default AvailableProjectList