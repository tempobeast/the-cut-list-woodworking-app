import React, { useState } from 'react'

const ProjectsContext = React.createContext();

function ProjectsProvider ({ children }) {
    const [projects, setProjects] = useState([]);

    return (
        <ProjectsContext.Provider value = {{ projects, setProjects }}>
            {children}
        </ProjectsContext.Provider>
    )
}
export { ProjectsContext, ProjectsProvider }