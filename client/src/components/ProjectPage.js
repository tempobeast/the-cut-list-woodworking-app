import React, { useState, useEffect } from "react";
import { Button } from "../styles";
import { useParams } from "react-router-dom"
import '../App.css';


function ProjectPage({ userId, onProjectButtonClick, onUpdateProjectClick, projects }) {

    const [clickedProject, setClickedProject] = useState({})
    const [cardStatus, setCardStatus] = useState('')

    const {id} = useParams();
    useEffect(() => {
        fetch(`/projects/${id}`)
        .then((res) => res.json())
        .then((clicked) => {
        setClickedProject(clicked)
            if (clicked.user_id === userId) {
                setCardStatus("user_authored_project")
            } else if (clicked.follows.find((follow) => follow.user_id === userId)) {
                setCardStatus("followed_project")
            } else {
                setCardStatus("all_projects")
            }
        })
    }, [id, userId])

    const {title, img_url, instructions, materials, time, tools_required, user, description} = clickedProject

function handleClick(e) {
    onProjectButtonClick(clickedProject.id, e)
}

function handleUpdateClick(e) {
    onUpdateProjectClick(clickedProject, e)
}

    return (
        <div className="project_page">
            <img src={img_url} alt={title} className="project_page_img"/>
            <h1>{title}</h1>
            <h3>{ user ? `By: ${user.username}` : "By: Me"}</h3>
            {cardStatus === "all_projects" ? <Button onClick={handleClick} className="project_page_button">add project</Button> : null }
            <h4>Time: {time}</h4>
            <p>{description}</p>
            <div>
                <h4>Materials used: </h4>
                <p>{materials}</p>
            </div>
            <div>
                <h4>Tools used: </h4>
                <p>
                {tools_required}
                </p>
            </div>
            <p className="p_wrap">{instructions}</p>
            <Button value={cardStatus} onClick={handleClick}>{cardStatus === "user_authored_project" ? "delete project" : cardStatus === "followed_project" ? "remove project" : "add project"}</Button>
            {cardStatus === "user_authored_project" ? <Button value="update_project" onClick={handleUpdateClick}>update project</Button> : null}
        </div>
    )
}

export default ProjectPage