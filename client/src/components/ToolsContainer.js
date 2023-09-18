import React, { useEffect, useState } from "react";
import "../App.css";
import ToolsRequiredContainer from "./ToolsSelected";
import ToolsAvailable from "./ToolsAvailable";
import ToolsSelected from "./ToolsSelected"
import ToolsAdd from "./ToolsAdd"

function ToolsContainer({ toolsRequired, setToolsRequired }) {
  const initialToolValue = {
    name: "",
    image: "",
  };
  const [toolData, setToolData] = useState([]);
  const [addTool, setAddTool] = useState(initialToolValue);
  const [toggleAddTool, setToggleAddTool] = useState(false);

  useEffect(() => {
    fetch("/tools")
      .then((res) => res.json())
      .then((tools) => setToolData(tools));
  }, []);

  function handleToolChange(e) {
    setAddTool({ ...addTool, [e.target.name]: e.target.value });
  }

  function submitAddTool(e) {
    fetch("/tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addTool),
    })
      .then((res) => res.json())
      .then((newTool) => {
        setToolData([...toolData, newTool]);
        setAddTool(initialToolValue);
      });
  }

  return (
    <div className='tools-container'>
        <h3>Select Tools</h3>
        <div className="tools-container_box">
          <ToolsAvailable 
              toolData={toolData} 
              toolsRequired={toolsRequired} 
              setToolsRequired={setToolsRequired}
          />
          <ToolsSelected
              toolsRequired={toolsRequired}
              setToolsRequired={setToolsRequired}
          />
        </div>
        <ToolsAdd toggleAddTool={toggleAddTool} 
            setToggleAddTool={setToggleAddTool} 
            handleToolChange={handleToolChange} 
            addTool={addTool} 
            submitAddTool={submitAddTool}
        />
    </div>
  );
}

export default ToolsContainer;
