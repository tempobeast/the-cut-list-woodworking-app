import React, { useState, useContext } from "react";
import { Input, Label, Textarea, Button, Error } from "../styles";
import "../App.css";
import { ProjectToUpdateContext } from "../context/projectToUpdate";
import { ErrorsContext } from "../context/errors";

function ProjectInstructionsForm({ step, setEditStep, origin }) {
  const { projectToUpdate, setProjectToUpdate } = useContext(
    ProjectToUpdateContext
  );
  const { errors, setErrors } = useContext(ErrorsContext);
  // if updating existing instructionStep, initialState values are existing step values
  // else initialState values are empty/null
  const initialState = step
    ? {
        step_detail: step.step_detail,
        // image: step.image_url
      }
    : {
        step_detail: "",
        image: null,
      };

  const [instructionData, setInstructionData] = useState(initialState);

  function handleDetailChange(e) {
    setInstructionData({ ...instructionData, [e.target.name]: e.target.value });
  }

  function onImageChange(e) {
    setInstructionData({ ...instructionData, image: e.target.files[0] });
  }

  //preps formData and sends to submitNextStep for POST or PATCH
  function onNextStepClick(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("project_id", projectToUpdate.id);
    formData.append("step_detail", instructionData.step_detail);
    //keeps null image from appending
    if (instructionData.image) {
      formData.append("image", instructionData.image);
    }
    submitNextStepFormData(formData);
  }

  //handles submit new POST and submit update PATCH based on existence of step prop
  function submitNextStepFormData(formData) {
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
          //if updating step, closes update form
          if (step) {
            setEditStep(false);
          }
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <h1>{step ? `Step ${step.step_number}: ` : "Add step"}</h1>
      <form onSubmit={onNextStepClick}>
        <Label htmlfor="step-detail">Next Step:</Label>
        <Textarea
          type="textarea"
          name="step_detail"
          autoComplete="off"
          value={instructionData.step_detail}
          onChange={handleDetailChange}
          required
        />
        <Label htmlFor="step-image">Step Image:</Label>
        <Input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
        />
        <Button onClick={onNextStepClick}>
          {step ? "Update Step" : "Next Step"}
        </Button>
      </form>
      {errors ? errors.map((err) => <Error key={err}>{err}</Error>) : null}
    </div>
  );
}
export default ProjectInstructionsForm;
