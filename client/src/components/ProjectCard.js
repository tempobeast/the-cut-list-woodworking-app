import React from "react";

function ProjectCard({ project }) {
    const {title, tools_recommended, tools_required, materials, time, instructions, img_url} = project

    const toolsNeeded = tools_required.split(", ")
    const toolsRec = tools_recommended.split(", ")

    return (
        <>
            <h3>{title}</h3>
            <p>{time}</p>
            <ul> Tools Required:
                {toolsNeeded.map((tool) => <li>{tool}</li>)}
            </ul>
            <ul> Tools Recommended:
                {toolsRec.map((tool) => <li>{tool}</li>)}
            </ul>
            <p>Materials Used: {materials}</p>
            <p>Instruction: {instructions}</p>
            <img src={img_url} alt={title}/>
        </>
    )
}

export default ProjectCard