import React from "react";
import '../App.css';

function ProjectCard({ project, id, onProjectButtonClick }) {
    const {title, tools_recommended, tools_required, materials, time, instructions, img_url} = project

    function toolsToDisplay(string) {
        const splitArr = string.split(", ")
        return splitArr.map((tool) => <li key={tool}>{tool}</li>)
    }

    function buttonValues() {
        if (id === "all_projects") {
            return "add project"
        } else if (id === "user_authored_project") {
            return "delete project"
        } else {
            return "remove project"
        }
    }

    function handleClick(e) {
        onProjectButtonClick(project.id, e)
    }

    return (
        <div className={id}>
            <h3>{title}</h3>
            <p>Time: {time} hrs</p>
            <ul> Tools Required:
                {toolsToDisplay(tools_required)}
            </ul>
            <ul> Tools Recommended:
                {toolsToDisplay(tools_recommended)}
            </ul>
            <p>Materials Used: {materials}</p>
            <p>Instruction: {instructions}</p>
            <img src={img_url} alt={title}/>
            <button value={buttonValues()} onClick={handleClick}>{buttonValues()}</button>
        </div>
    )
}

export default ProjectCard