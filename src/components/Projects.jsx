import React from 'react'

function Projects() {
    const projects = [
        { id: 1, title: 'Project 1' },
        { id: 2, title: 'Project 2' },
        { id: 3, title: 'Project 3' }
    ];

    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Projects
