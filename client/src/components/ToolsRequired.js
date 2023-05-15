import React from "react";
import toolData from "../ToolData";
import '../App.css';
import ToolsRequiredContainer from "./ToolsRequiredContainer";

function ToolsRequired({toolsRequired, setToolsRequired}) {

    const toolsToDisplay = toolData
        .sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0 )
        .map((tool) => <li key={tool.name}><p onClick={() => setToolsRequired([...toolsRequired, tool])}>{tool.name}</p></li> )
   
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
            <ToolsRequiredContainer toolsRequired={toolsRequired}/>
        </div>
    )
}

export default ToolsRequired