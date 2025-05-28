import React, { useState } from 'react'

const ToolsContext = React.createContext();

function ToolsProvider ({ children }) {
    const [ tools, setTools] = useState([
        {
            name: "Hammer",
            image: "https://m.media-amazon.com/images/I/71tTWyypTKL._AC_UF894,1000_QL80_.jpg"
        },
        {
            name: "Circular Saw",
            image: "https://m.media-amazon.com/images/I/71RdFLNY-XL.jpg"
        }
    ]);

    return (
        <ToolsContext.Provider value = {{ tools, setTools }}>
            {children}
        </ToolsContext.Provider>
    )
}

export { ToolsContext, ToolsProvider }