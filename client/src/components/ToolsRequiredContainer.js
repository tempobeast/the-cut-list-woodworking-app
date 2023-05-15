import React from "react";
import '../App.css';

function ToolsRequiredContainer({toolsRequired}) {

    const selectedTools = toolsRequired.map((tool) => 
        <div key={tool.name} className="tool-required">
            <div className="tool-required__image-container">
                <img className="tool-required__image" src={tool.image} alt={tool.name}/>
            </div>
            <p className="tool-required__name">{tool.name}</p>
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