function ToolsAvailable({toolData, toolsRequired, setToolsRequired}) {

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
            <ul className="tools-list_available">{toolsToDisplay}</ul>
        </div>
    )
}

export default ToolsAvailable