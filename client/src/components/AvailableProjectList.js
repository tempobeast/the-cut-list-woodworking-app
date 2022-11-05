import React, { useContext } from "react";
import ProjectCard from './ProjectCard'
import '../App.css'
import { ProjectsContext } from "../context/projects";

function AvailableProjectList({ onProjectButtonClick, search, setSearch }) {

    const { projects } = useContext(ProjectsContext)
    const filterProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    function handleChange(e) {
        setSearch(e.target.value)
      }

    return (
        <div>
            <h2>Available Projects:</h2>
            <form >
                <input type="text" placeholder="search" className="projects-header" onChange={handleChange} />
            </form>
            <div className="project-container">
            {filterProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} followed={false} />)}
            </div>
        </div>
    )
}

export default AvailableProjectList