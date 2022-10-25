import React, { useContext } from "react";
import ProjectCard from './ProjectCard'
import '../App.css'
import { ProjectsContext } from "../context/projects";
import App from "./App";
import NewProject from "./NewProject";
import ProjectPage from "./ProjectPage";
import UserProjectList from "./UserProjectList";

function AvailableProjectList({ onProjectButtonClick, search }) {

    const { projects } = useContext(ProjectsContext)
    const filterProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Available Projects:</h2>
            <div className="project-container">
            {filterProjects.map((project) => <ProjectCard all={true} project={project} key={project.id} onProjectButtonClick={onProjectButtonClick} followed={false} />)}
            </div>
        </div>
    )
}

export default AvailableProjectList