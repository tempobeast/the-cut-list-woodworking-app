function ToolsAvailable({toolData, toolsRequired, setToolsRequired}) {
    console.log(toolData)

    const toolsToDisplay = toolData
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .map((tool) => (
      <li key={tool.name}>
        <p onClick={() => setToolsRequired([...toolsRequired, tool])}>
          {tool.name}
        </p>
      </li>
    ));

    return (
        <div>
            <p>ToolsAvailable</p>
            <ul>{toolsToDisplay}</ul>
        </div>
    )
}

export default ToolsAvailable