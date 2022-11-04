import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css';
import ProjectInstructionsForm from "./ProjectInstructionsForm";
import InstructionStep from "./InstructionStep";
import { ProjectToUpdateContext } from '../context/projectToUpdate.js';

function ProjectInstructionsContainer() {

    const { projectToUpdate, setProjectToUpdate } = useContext(ProjectToUpdateContext)
    const {id} = useParams()
    const navigate = useNavigate()

    if (!projectToUpdate) {
        fetch(`/projects/${id}`)
        .then((res) => res.json())
        .then((project) => setProjectToUpdate(project))
    }

    console.log(projectToUpdate)
  
    return (
        <div>
            <h3>Instructions: </h3>
            {projectToUpdate.instruction_steps ? projectToUpdate.instruction_steps.map((step, index) => <InstructionStep key={step.id} step={step} index={index}/>) : null}
            <div>
                <ProjectInstructionsForm projectId={id} />
            </div>
            <button onClick={() => navigate(`/projects/${id}`)}>Submit Instructions</button>
        </div>
    )
}
export default ProjectInstructionsContainer