import React from "react";
import '../App.css';

function ToolsRequiredContainer({toolsRequired}) {

    const selectedTools = toolsRequired.map((tool) => 
        <div key={tool.name} className="tool-required">
            <img className="tool-required__image" src={tool.image} alt={tool.name}/>
            <p className="tool-required__name">{tool.name}</p>
        </div>
    )

    return (
        <div className="tools-required__container">
            <ul>
                {selectedTools}
            </ul>
        </div>
    )
}

export default ToolsRequiredContainer