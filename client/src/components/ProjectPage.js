import React from "react";
import { Button } from "../styles";

function ProjectPage({ clickedProject, userId, onProjectButtonClick, onUpdateProjectClick }) {

    console.log(clickedProject)
    
    const {title, img_url, instructions, materials, time, tools_required, user, description} = clickedProject

    const toolsToDisplay = tools_required.split(', ')
    // const materialsToDisplay = materials.split(', ')

    const cardIds = () => {
        if (clickedProject.user_id === userId) {
            return "user_authored_project"
        } else if (clickedProject.follows.find((follow) => follow.user_id === userId)) {
            return "followed_project"
        } else {
            return "all_projects"
        }
    }
    console.log(userId)
    console.log(cardIds())

function handleClick(e) {
    onProjectButtonClick(clickedProject.id, e)
}

function handleUpdateClick(e) {
    onUpdateProjectClick(clickedProject, e)
}

    return (
        <div className="project_page">
            <img src={img_url} alt={title} className="project_page_img"/>
            {cardIds() === "all_projects" ? <Button onClick={handleClick}>add project</Button> : null }
            <h1>{title}</h1>
            <h3>By: {user.username}</h3>
            <h4>Time: {time}</h4>
            <p>{description}</p>
            <div>
                <h4>Materials used: </h4>
                <ul>
                    <li>{materials}</li>
                    {/* {materialsToDisplay[0].map((material) => <li>{material}</li>)} */}
                </ul>
            </div>
            <div>
                <h4>Tools used: </h4>
                <ul>
                    {toolsToDisplay.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
            </div>
            <p>{instructions}</p>
            <Button value={cardIds()} onClick={handleClick}>{cardIds() === "user_authored_project" ? "delete project" : cardIds() === "followed_project" ? "remove project" : "add project"}</Button>
            {cardIds() === "user_authored_project" ? <Button value="update_project" onClick={handleUpdateClick}>update project</Button> : null}
        </div>
    )
}

export default ProjectPage