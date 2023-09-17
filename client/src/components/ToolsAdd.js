function ToolsAdd({toggleAddTool, setToggleAddTool, handleToolChange, addTool, submitAddTool}) {

    return (
        <div>
        {!toggleAddTool ? (
            <div>
            <sub>Can't find the tool you're looking for?</sub>
            <button onClick={() => setToggleAddTool(!toggleAddTool)}>
                Click Here to add a tool
            </button>
            </div>
        ) : (
            <div>
            <input
                onChange={handleToolChange}
                name='name'
                placeholder='add tool'
                value={addTool.name}
            ></input>
            <input
                onChange={handleToolChange}
                name='image'
                placeholder='add tool image url'
                value={addTool.image}
            ></input>
            <button onClick={submitAddTool}>add</button>
            </div>
        )}
        </div>
    )
}
export default ToolsAdd