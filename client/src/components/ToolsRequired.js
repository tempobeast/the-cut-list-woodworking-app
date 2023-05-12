import React from "react";
import ToolCard from "./ToolCard";
import toolData from "../ToolData";
import '../App.css';
import ToolsRequiredContainer from "./ToolsRequiredContainer";

function ToolsRequired({toolsRequired, setToolsRequired}) {

    const toolsToDisplay = toolData.map((tool) => <li key={tool.name}><p onClick={() => setToolsRequired([...toolsRequired, tool])}>{tool.name}</p></li> )
   
    return (
        <div className="tools-required">
            <div className="tools-required__not-selected">
                <h3>Select Tools</h3>
                <ul className="tools-list">
                    {toolsToDisplay}
                </ul>
                <input placeholder="add tool"></input>
                <input placeholder="add tool image url"></input>
                <button>x</button>
            </div>
            <div className="tools-required__selected">
                <ToolsRequiredContainer toolsRequired={toolsRequired}/>
            </div>
        </div>
    )
}

export default ToolsRequired