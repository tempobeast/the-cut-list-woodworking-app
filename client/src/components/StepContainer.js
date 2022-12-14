import React, { useState } from "react";
import '../App.css';
import InstructionStep from "./InstructionStep";
import ProjectInstructionsForm from "./ProjectInstructionsForm";

function StepContainer({step, cardStatus, origin}) {

    const [ editStep, setEditStep ] = useState(false)

    if (cardStatus === "followed_project" || cardStatus === "all_projects") {
        return (
            <InstructionStep step={step}/>
        )
    }

    if (origin === "has_steps") {
        return (
            <div>         
                {
                editStep 
                ? <ProjectInstructionsForm step={step} setEditStep={setEditStep} editStep={editStep} origin={origin}/> 
                : <InstructionStep step={step} setEditStep={setEditStep} origin={origin} /> 
                }
                <br/>
                <button onClick={() => setEditStep(!editStep)}>{editStep ? "close edit form" : "edit step"}</button>
                <hr></hr>
            </div>
        )
    } else {
        return (
            <ProjectInstructionsForm step={false} setEditStep={setEditStep}  origin={origin}/>
        )
    }
}
export default StepContainer