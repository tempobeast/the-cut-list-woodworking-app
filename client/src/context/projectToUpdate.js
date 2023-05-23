import React, { useState } from 'react'

const ProjectToUpdateContext = React.createContext();

function ProjectToUpdateProvider ({ children }) {
    const [projectToUpdate, setProjectToUpdate] = useState({
        title: '', 
        img_url: '', 
        materials: '', 
        time: '', 
        description: '',
        tools: '',
        user_id: '',
        creator: '',
        instructions: '',
    });

    return (
        <ProjectToUpdateContext.Provider value = {{ projectToUpdate, setProjectToUpdate }}>
            {children}
        </ProjectToUpdateContext.Provider>
    )
}
export { ProjectToUpdateContext, ProjectToUpdateProvider }