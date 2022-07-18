import React from "react";
import '../App.css';

function ProjectCard({ project, onProjectButtonClick, onUpdateProjectClick, userId, followed, onProjectCardClick }) {
    const {title, time, instructions, img_url} = project

    const cardIds = () => {
        if (project.user_id === userId) {
            return "user_authored_project"
        } else if (followed) {
            return "followed_project"
        } else {
            return "all_projects"
        }
    }

    function handleUpdateClick(e) {
        onUpdateProjectClick(e, project)
    }

    function handleClick(e) {
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
            {/* <ul> Tools Required:
                {toolsToDisplay(tools_required)}
            </ul>
            <ul> Tools Recommended:
                {toolsToDisplay(tools_recommended)}
            </ul>
            <p>Materials Used: {materials}</p> */}
            <p className="project_card_details">{instructions}</p>
            <p>{project.user ? `By: ${project.user.username}` : null}</p>
            <button value={cardIds()} onClick={handleClick}>{cardIds() === "user_authored_project" ? "delete project" : cardIds() === "followed_project" ? "remove project" : "add project"}</button>
            {cardIds() === "user_authored_project" ? <button value="update_project" onClick={handleUpdateClick}>update project</button> : null}
            <p>{project.follows ? `follows: ${project.follows.length}` : null}</p>
        </div>
    )
}

export default ProjectCard