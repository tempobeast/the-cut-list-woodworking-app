import React, { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";

function NewProject({ onNewProjectSubmit }) {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        tools_required: "",
        tools_recommended: "",
        materials: "",
        time: "",
        instructions: "",
        img_url: "",
    })

    function handleChange(e) {
        setFormData({...formData,
            [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        onNewProjectSubmit(formData)
    }



    return (
        <>
            <h3>Create a new project</h3>
            <form onSubmit={handleSubmit}>
            <FormField>
                <Label htmlfor="title">Title</Label>
                <Input 
                    type="text"
                    name="title"
                    autoComplete="off"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </FormField>
            <FormField>
                <Label htmlfor="tools_required">Tools Required</Label>
                <Input
                    type="text"
                    name="tools_required"
                    autoComplete="off"
                    value={formData.tools_required}
                    onChange={handleChange}
                    required
                />
            </FormField>
            <FormField>
                <Label htmlfor="tools_recommended">Tools Recommended</Label>
                <Input
                    type="text"
                    name="tools_recommended"
                    autoComplete="off"
                    value={formData.tools_recommended}
                    onChange={handleChange}
                    required
                />
            </FormField>
            <FormField>
                <Label htmlfor="materials">Materials</Label>
                <Input
                    type="text"
                    name="materials"
                    autoComplete="off"
                    value={formData.materials}
                    onChange={handleChange}
                    required
                />
            </FormField>
            <FormField>
                <Label htmlfor="time">Time to complete</Label>
                <Input
                    type="number"
                    name="time"
                    autoComplete="off"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </FormField>
            <FormField>
                <Label htmlfor="instructions">Instructions</Label>
                <Input
                    type="textarea"
                    name="instructions"
                    autoComplete="off"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                />
            </FormField>
            <FormField>
                <Label htmlfor="img_url">Add an image</Label>
                <Input
                    type="text"
                    name="img_url"
                    autoComplete="off"
                    value={formData.img_url}
                    onChange={handleChange}
                />
            </FormField>
            <FormField>
                <Button type="submit">
                    {isLoading ? "Loading..." : "Submit Project"}
                </Button>
            </FormField>
            <FormField>
                { errors ? 
                errors.map((err) => (<Error key={err}>{err}</Error>)) 
                : null}
            </FormField>
        </form>
    </>
    )
}

export default NewProject