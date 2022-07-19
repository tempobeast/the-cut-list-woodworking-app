import React from "react";
import '../App.css';

function ProjectCard({ project, onProjectButtonClick, onUpdateProjectClick, userId, all, onProjectCardClick }) {
    const {title, time, description, img_url} = project

    const cardIds = () => {
        if (project.user_id === userId) {
            return "user_authored_project"
        } else if (project.user_id !== userId && all === true) {
            return "all_projects"
        } else {
            return "followed_project"
        }
    }

    function handleUpdateClick(e) {
        e.stopPropagation();
        onUpdateProjectClick(project, e)
    }

    function handleButtonClick(e) {
        e.stopPropagation();
        onProjectButtonClick(project.id, e)
    }

    function handleCardClick(e) {
        onProjectCardClick(project.id)
    }

    return (
        <div className="project_card" id={cardIds()} onClick={handleCardClick}>
            <img src={img_url} alt={title} className="project_image"/>
            <h3>{title}</h3>
            <p>Time: {time} hrs</p>
            <p className="project_card_details">{description}</p>
            <p>{project.user ? `By: ${project.user.username}` : "User Authored Project"}</p>
            <button value={cardIds()} onClick={handleButtonClick}>{cardIds() === "user_authored_project" ? "delete project" : cardIds() === "followed_project" ? "remove project" : "add project"}</button>
            {cardIds() === "user_authored_project" ? <button value="update_project" onClick={handleUpdateClick}>update project</button> : null}
            <p>{project.follows ? `follows: ${project.follows.length}` : null}</p>
        </div>
    )
}

export default ProjectCard