import React, { useState } from "react";
import '../App.css';
import ProjectInstructionsForm from "./ProjectInstructionsForm";

function InstructionStep({step, index, cardStatus}) {

    const [ editStep, setEditStep ] = useState(false)

    if (!editStep) {
        return (
            <div key={step.id}>
                <h4>Step {step.step_number}:</h4>
                <p>{step.step_detail}</p>
                <img src={step.image_url} alt={step.detail} className="step-image"/>
                {cardStatus === "user_authored_project" ? <button onClick={() => setEditStep(true)}>edit step</button> : null}
            </div>
        )
    } else {
        return (
            <ProjectInstructionsForm stepToEdit={step} index={index} setEditStep={setEditStep}/>
        )
    }
}
export default InstructionStep