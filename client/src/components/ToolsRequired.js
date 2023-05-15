import React, { useEffect, useState } from "react";
// import toolData from "../ToolData";
import '../App.css';
import ToolsRequiredContainer from "./ToolsRequiredContainer";

function ToolsRequired({toolsRequired, setToolsRequired}) {

    const initialToolValue = {
        name: '',
        image: ''
    }
    const [ toolData, setToolData ] = useState([])
    const [ addTool, setAddTool ] = useState(initialToolValue)

    useEffect(() => {
        fetch("/tools")
        .then((res) => res.json())
        .then((tools) => setToolData(tools))
    }, [])
    
    function handleChange(e) {
        setAddTool({...addTool,
            [e.target.name]: e.target.value
        })
    }

    function submitAddTool(e) {
        fetch('/tools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addTool)
        })
        .then((res) => res.json())
        .then((newTool) => {
            setToolData([...toolData, newTool]);
            setAddTool(initialToolValue)
        })
    }

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
                <input onChange={handleChange} name="name" placeholder="add tool" value={addTool.name}></input>
                <input onChange={handleChange} name="image" placeholder="add tool image url" value={addTool.image}></input>
                <button onClick={submitAddTool}>add</button>
            </div>
            <ToolsRequiredContainer toolsRequired={toolsRequired}/>
        </div>
    )
}

export default ToolsRequired