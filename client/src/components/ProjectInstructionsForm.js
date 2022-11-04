import React, { useState, useContext } from "react";
import { Input, Label, Textarea } from "../styles";
import '../App.css';
import { ProjectToUpdateContext } from "../context/projectToUpdate";

function ProjectInstructionsForm({ stepToEdit, setEditStep }) {

    const { projectToUpdate, setProjectToUpdate } = useContext(ProjectToUpdateContext)
    const initialState = stepToEdit ? 
        {
        step_detail: stepToEdit.step_detail,
        // image: stepToEdit.image_url
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
        formData.append('image', instructionData.image);
        submitFormData(formData)
    }

    function submitFormData(formData) {
        fetch(stepToEdit ? `/instruction_steps/${stepToEdit.id}` : '/instruction_steps', {
            method: stepToEdit ? "PATCH" : "POST",
            body: formData,
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((updatedProject) => {
                    setInstructionData(initialState)
                    setProjectToUpdate(updatedProject)
                    setEditStep(false)
                })
            } else {
                res.json().then((error) => console.log(error.error))
            }
        })
    }

    return (
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
                <button>{stepToEdit ? "Update Step" : "Next Step"}</button>
        </form>
    )
}
export default ProjectInstructionsForm