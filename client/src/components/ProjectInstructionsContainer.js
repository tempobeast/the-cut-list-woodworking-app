import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css';
import { ProjectToUpdateContext } from '../context/projectToUpdate.js';
import StepContainer from "./StepContainer";

function ProjectInstructionsContainer({cardStatus}) {

    const { projectToUpdate, setProjectToUpdate } = useContext(ProjectToUpdateContext)
    const { instruction_steps } = projectToUpdate
    const { id } = useParams()
    const [ addStep, setAddStep ] = useState(false)

    if (!projectToUpdate) {
        fetch(`/projects/${id}`)
        .then((res) => res.json())
        .then((project) => setProjectToUpdate(project))
    }

    const sortInstructionSteps = () => instruction_steps.sort((a, b) => a.step_number < b.step_number ? -1 : a.step_number > b.step_number ? 1 : 0)

    return (
        <div>
            {instruction_steps ? sortInstructionSteps().map((step) => <StepContainer origin={"has_steps"} step={step} key={step.id} cardStatus={cardStatus}/>) 
            : <StepContainer origin={"no_steps"} cardStatus={cardStatus}/> 
            }
            {
            cardStatus === "user_authored_project" 
                ?   <div>
                        <button value={!addStep ? "add_step" : "remove_step"} onClick={() => setAddStep(!addStep)}>{!addStep ? "add step" : "close step"}</button>
                        {addStep ? <StepContainer origin={"add_step"} cardStatus={cardStatus} /> : null}
                    </div>
                : null
            }
        </div>
    )
}
export default ProjectInstructionsContainer