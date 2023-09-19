function ToolsAvailable({toolData, toolsRequired, setToolsRequired}) {

    const toolsToDisplay = toolData
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .map((tool) => (
      <li className="tools-list_available-item" key={tool.name}>
        <p onClick={() => setToolsRequired([...toolsRequired, tool])}>
          {tool.name}
        </p>
      </li>
    ));

    return (
            <ul className="tools-list_available">{toolsToDisplay}</ul>
    )
}

export default ToolsAvailable