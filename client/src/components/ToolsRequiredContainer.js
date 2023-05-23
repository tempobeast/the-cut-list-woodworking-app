import React from "react";
import '../App.css';

function ToolsRequiredContainer({toolsRequired, setToolsRequired}) {

    function handleRemoveTool(toolId) {
        console.log(toolId)
        const newToolList = toolsRequired.filter((toolListItem) => toolListItem.id !== toolId)
        setToolsRequired(newToolList)
    }

    console.log(toolsRequired)

    const selectedTools = toolsRequired.map((tool) => 
        <div key={tool.id} className="tool-required">
            <div className="tool-required__image-container">
                <img className="tool-required__image" src={tool.image} alt={tool.name}/>
            </div>
            <p  className="tool-required__name">{tool.name}</p>
            <button onClick={() => handleRemoveTool(tool.id)} className="tools-required-container__remove">x</button>
        </div>
    )

    return (
        <div className="tools-required__selected">
            <ul>
                {selectedTools}
            </ul>
        </div>
    )
}

export default ToolsRequiredContainer