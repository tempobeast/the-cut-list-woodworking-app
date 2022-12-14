import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { ProjectToUpdateContext } from "../context/projectToUpdate";
import { UserContext } from "../context/user";
import { ErrorsContext } from "../context/errors"

function ProjectCard({ project, onProjectButtonClick, all }) {
    const {title, time, description, img_url} = project
    const { setProjectToUpdate } = useContext(ProjectToUpdateContext)
    const { errors } = useContext(ErrorsContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const cardIds = () => {
        if (project.user_id === user.id) {
            return "user_authored_project"
        } else if (project.user_id !== user.id && all === true) {
            return "all_projects"
        } else {
            return "followed_project"
        }
    }

    function handleUpdateClick(e) {
        e.stopPropagation();
        setProjectToUpdate(project)
        navigate(`/update_project`)
    }

    function handleButtonClick(e) {
        e.stopPropagation();
        onProjectButtonClick(project.id, e)
    }

    function handleCardClick(e) {
        navigate(`/projects/${project.id}`)
    }

    return (
        <div className="project_card" id={cardIds()} onClick={handleCardClick}>
            <img src={img_url} alt={title} className="project_image"/>
            <h3>{title}</h3>
            <p>Time: {time} hrs</p>
            <p className="project_card_details">{description}</p>
            <p>{project.user ? `By: ${project.user.username}` : "User Authored Project"}</p>
            <button value={cardIds()} onClick={handleButtonClick}>{cardIds() === "user_authored_project" ? "delete project" : cardIds() === "followed_project" ? "remove project" : "add project"}</button>
            {errors ? <p>{errors}</p> : null}
            {cardIds() === "user_authored_project" ? <button value="update_project" onClick={handleUpdateClick}>update project</button> : null}
            <p>{project.follows ? `follows: ${project.follows.length}` : null}</p>
        </div>
    )
}

export default ProjectCard