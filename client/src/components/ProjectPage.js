import React, { useState, useEffect, useContext } from "react";
import { Button } from "../styles";
import { useNavigate, useParams } from "react-router-dom"
import '../App.css';
import { ProjectToUpdateContext } from '../context/projectToUpdate.js'
import { UserContext } from "../context/user";
import ProjectInstructionsContainer from "./ProjectInstructionsContainer";


function ProjectPage({ onProjectButtonClick }) {
    
    const { projectToUpdate, setProjectToUpdate } = useContext(ProjectToUpdateContext)
    const { user } = useContext(UserContext)
    const [ cardStatus, setCardStatus ] = useState('')
    const { id } = useParams();
    const [ tools, setTools ] = useState([]) 

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/projects/${id}`)
        .then((res) => res.json())
        .then((clickedProject) => {
            updateCardStatus(clickedProject)
            setProjectToUpdate(clickedProject) 
            setTools(clickedProject.tools)
        })
    }, [id, user, setProjectToUpdate])

    function updateCardStatus(clickedProject) {
        if (clickedProject.user_id === user.id) {
            setCardStatus("user_authored_project")
        } else if (clickedProject.follows.find((follow) => follow.user_id === user.id)) {
            setCardStatus("followed_project")
        } else {
            setCardStatus("all_projects")
        }
    }

    const {title, img_url, materials, time, description} = projectToUpdate
    
    const displayTools =  tools.map((tool) => {
        return (
            <div key={tool.name} className="project-page tool-required">
                <div className="tool-required__image-container">
                    <img className="tool-required__image" src={tool.image} alt={tool.name}/>
                </div>
                <p className="tool-required__name">{tool.name}</p>
            </div>
        )
    })

    function handleClick(e) {
        onProjectButtonClick(projectToUpdate.id, e)
    }

    function handleUpdateClick(e) {
        navigate(`/update_project/${id}`)
    }

    return (
        <div className="project_page">
            <img src={img_url} alt={title} className="project_page_img"/>
            <h1>{title}</h1>
            <h3>{ projectToUpdate.user_id === user.id ? "By: Me" : `By: ${projectToUpdate.creator}` }</h3>
            {cardStatus === "all_projects" ? <Button onClick={handleClick} className="project_page_button">add project</Button> : null }
            <h4>Time: {time}</h4>
            <p>{description}</p>
            <div>
                <h4>Materials used: </h4>
                <p>{materials}</p>
            </div>
            <div>
                <h4>Tools used: </h4>
                {projectToUpdate ? displayTools : null}
            </div>
            <div>
                <h4>Instructions:</h4>
                <ProjectInstructionsContainer cardStatus={cardStatus}/>
            </div>
            {cardStatus === "user_authored_project" 
            ?   (   <div>
                        <Button value="update_project" onClick={handleUpdateClick}>update project details</Button> 
                    </div>
                )
            : null
            }
            <Button value={cardStatus} onClick={handleClick}>{cardStatus === "user_authored_project" ? "delete project" : cardStatus === "followed_project" ? "remove project" : "add project"}</Button>

        </div>
    )
}

export default ProjectPage