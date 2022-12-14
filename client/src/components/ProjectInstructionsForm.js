import React, { useState, useContext } from "react";
import { Input, Label, Textarea, Button } from "../styles";
import "../App.css";
import { ProjectToUpdateContext } from "../context/projectToUpdate";

function ProjectInstructionsForm({ step, setEditStep, origin }) {
  const { projectToUpdate, setProjectToUpdate } = useContext(
    ProjectToUpdateContext
  );
  // if updating existing instructionStep, initialState values are existing step values
  // else initialState values are empty/null
  const initialState = step
    ? {
        step_detail: step.step_detail,
        image: step.image_url,
      }
    : {
        step_detail: "",
        image: null,
      };

  const [instructionData, setInstructionData] = useState(initialState);

  function onStepDetailChange(e) {
    setInstructionData({ ...instructionData, [e.target.name]: e.target.value });
  }

  function onImageChange(e) {
    setInstructionData({ ...instructionData, image: e.target.files[0] });
  }

  //preps formData and sends to submitNextStep for POST or PATCH
  function handleSubmitNextStep(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("project_id", projectToUpdate.id);
    formData.append("step_detail", instructionData.step_detail);
    if (instructionData.image) {
      formData.append("image", instructionData.image);
    }
    submitNextStep(formData);
    if (step) {
      setEditStep(false);
    }
  }

  //handles submit new POST and submit update PATCH based on existence of step prop
  function submitNextStep(formData) {
    fetch(step ? `/instruction_steps/${step.id}` : "/instruction_steps", {
      method: step ? "PATCH" : "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedProject) => {
          if (origin === "add_step") {
            setInstructionData(initialState);
          }
          setProjectToUpdate(updatedProject);
        });
      } else {
        res.json().then((error) => console.log(error.error));
      }
    });
  }

  return (
    <div>
      <h1>{step ? `Step ${step.step_number}: ` : "Add step"}</h1>
      <form onSubmit={handleSubmitNextStep}>
        <Label htmlfor="step-detail">Next Step:</Label>
        <Textarea
          type="textarea"
          name="step_detail"
          autoComplete="off"
          value={instructionData.step_detail}
          onChange={onStepDetailChange}
          required
        />
        <Label htmlFor="step-image">Step Image:</Label>
        <Input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
        />
        <Button type="submit">{step ? "Update Step" : "Next Step"}</Button>
      </form>
    </div>
  );
}
export default ProjectInstructionsForm;
