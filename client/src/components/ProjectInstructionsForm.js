import React, { useState, useContext } from "react";
import { Input, Label, Textarea } from "../styles";
import '../App.css';
import { ProjectToUpdateContext } from "../context/projectToUpdate";

function ProjectInstructionsForm({ step, setEditStep, origin }) {

    const { projectToUpdate, setProjectToUpdate } = useContext(ProjectToUpdateContext)
    const initialState = step ? 
        {
        step_detail: step.step_detail,
        // image: step.image_url
        }
        :
        {
        step_detail: "",
        image: null
        }
    
    const [instructionData, setInstructionData] = useState(initialState)
    
    function handleChange(e) {
        setInstructionData({...instructionData, [e.target.name]: e.target.value})
    }

    function onImageChange(e) {
        setInstructionData({...instructionData, image: e.target.files[0]})
    }

    function onNextStepClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('project_id', projectToUpdate.id);
        formData.append('step_detail', instructionData.step_detail);
        if (instructionData.image) { 
            formData.append('image', instructionData.image)
        } 
        submitNextStepFormData(formData);
        if (step) {
            setEditStep(false)
        }
    }

    function submitNextStepFormData(formData) {
        fetch(step ? `/instruction_steps/${step.id}` : '/instruction_steps', {
            method: step ? "PATCH" : "POST",
            body: formData,
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((updatedProject) => {
                    // const updatedStep = updatedProject.instruction_steps.find((newStep) => newStep.id === step.id)
                    if (origin === "add_step") {
                        setInstructionData(initialState);
                    } 
                    setProjectToUpdate(updatedProject);
                })
            } else {
                res.json().then((error) => console.log(error.error))
            }
        })
    }

    return (
        <div>
            <h1>{step ? `Step ${step.step_number}: `: "Add step"}</h1>
        
            <form onSubmit={onNextStepClick}>
                <Label htmlfor="step-detail">Next Step:</Label>
                    <Textarea
                    type="textarea"
                    name="step_detail"
                    autoComplete="off"
                    value={instructionData.step_detail}
                    onChange={handleChange}
                    required/>
                <Label htmlFor="step-image">Step Image:</Label>
                <Input 
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={onImageChange}
                />
                    <button onClick={onNextStepClick}>{step ? "Update Step" : "Next Step"}</button>
                    {/* <button onClick={() => navigate(`/projects/${id}`)}>Submit Instructions</button> */}

            </form>
        </div>
    )
}
export default ProjectInstructionsForm