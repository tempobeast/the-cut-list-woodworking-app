import React, { useState } from 'react'

const ProjectToUpdateContext = React.createContext();

function ProjectToUpdateProvider ({ children }) {
    const [projectToUpdate, setProjectToUpdate] = useState('');

    return (
        <ProjectToUpdateContext.Provider value = {{ projectToUpdate, setProjectToUpdate }}>
            {children}
        </ProjectToUpdateContext.Provider>
    )
}
export { ProjectToUpdateContext, ProjectToUpdateProvider }