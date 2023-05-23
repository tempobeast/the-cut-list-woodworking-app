import React from "react";
import '../App.css';

function InstructionStep({step}) {

     return (
        <div className="instruction-step">
            <h4>Step {step.step_number}:</h4>
            <p>{step.step_detail}</p>
            <img src={step.image_url} alt={step.detail} className="step-image"/>
        </div>
    )
}
export default InstructionStep