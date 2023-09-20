import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import '../App.css';
import { UserContext } from '../context/user.js'
import ToolsContainer from "./ToolsContainer";

function NewProject() {
    
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [ toolsRequired, setToolsRequired ] = useState([])
    const [formData, setFormData] = useState(
        { 
            title: "",
            description: "",
            materials: "",
            time: "",
            img_url: "",
        }
    )

    function handleChange(e) {
        setFormData({...formData,
            [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch ('/projects' , {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({...formData, tools_required: toolsRequired})
        })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            res.json().then((data) => { 
                const newProject = data[0];
                const updatedUser = data[1];
                setUser(updatedUser);
                navigate(`projects/${newProject.id}`)
            })
          } else {
            res.json().then((errors) => setErrors(errors.errors))
            }
        })
      }

    return (
        <div className="new-project-form">
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
                <Label htmlfor="img_url">Add an Image of the Completed Project</Label>
                <Input
                    type="text"
                    name="img_url"
                    autoComplete="off"
                    value={formData.img_url}
                    onChange={handleChange}
                />
            </FormField>
            <ToolsContainer toolsRequired={toolsRequired} setToolsRequired={setToolsRequired}/>
            <FormField>
                <Label htmlfor="description">Description</Label>
                <Textarea
                    type="textarea"
                    name="description"
                    autoComplete="off"
                    value={formData.description}
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
                <Button type="submit">
                    {isLoading ? "Loading..." : "Submit Project"}
                </Button>
                <Button onClick={handleSubmit} value="instructions">
                    {isLoading ? "Loading..." : "Add Instructions"}
                </Button>
            </FormField>
            <FormField>
                { errors ? 
                errors.map((err) => (<Error key={err}>{err}</Error>)) 
                : null}
            </FormField>
        </form>
    </div>
    )
}

export default NewProject