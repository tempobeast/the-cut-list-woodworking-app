import React, { useState, useEffect, useContext } from "react";
import { Button } from "../styles";
import { useNavigate, useParams } from "react-router-dom"
import '../App.css';
import { ProjectToUpdateContext } from '../context/projectToUpdate.js'
import { UserContext } from "../context/user";


function ProjectPage({ onProjectButtonClick }) {
    
    const { projectToUpdate, setProjectToUpdate } = useContext(ProjectToUpdateContext)
    const { user } = useContext(UserContext)
    const [ cardStatus, setCardStatus ] = useState('')
    const { id } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/projects/${id}`)
        .then((res) => res.json())
        .then((clickedProject) => {
            setProjectToUpdate(clickedProject)
            if (clickedProject.user_id === user.id) {
                setCardStatus("user_authored_project")
            } else if (clickedProject.follows.find((follow) => follow.user_id === user.id)) {
                setCardStatus("followed_project")
            } else {
                setCardStatus("all_projects")
            }
        })
    }, [id, user, setProjectToUpdate])

    const {title, img_url, instruction_steps, materials, time, tools_required, creator, description} = projectToUpdate

    function handleClick(e) {
        onProjectButtonClick(projectToUpdate.id, e)
    }

    function handleUpdateClick(e) {
        navigate(`/update_project`)
    }

    return (
        <div className="project_page">
            <img src={img_url} alt={title} className="project_page_img"/>
            <h1>{title}</h1>
            <h3>{ creator ? `By: ${creator.username}` : "By: Me"}</h3>
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
            <div>
                <h4>Instructions:</h4>
                {instruction_steps ? instruction_steps.map((step) => (
                    <div key={step.id}>
                        <h5>Step {step.step_number}</h5>
                        <p>{step.step_detail}</p>
                        <img src={step.image_url} alt={step.step_detail} className="step-image" />
                    </div>
                )) : null}
            </div>
            <Button value={cardStatus} onClick={handleClick}>{cardStatus === "user_authored_project" ? "delete project" : cardStatus === "followed_project" ? "remove project" : "add project"}</Button>
            {cardStatus === "user_authored_project" ? <Button value="update_project" onClick={handleUpdateClick}>update project</Button> : null}
        </div>
    )
}

export default ProjectPage