import React from 'react'
import '../styles/projects.css'

function Projects() {
    const projects = [
        { id: 1, title: 'Shopping List App', link: "https://anupdhoble.github.io/shopping_list/", description: 'This is a simple web application that allows you to create a shopping list and store it in a Firebase Realtime Database. You can add items to the list, delete items by double-clicking on them, and the changes will be reflected in the database.',img_link:'https://github.com/anupdhoble/shopping_list/assets/83175840/34a4553e-bfe5-4136-bbb1-be5a2e11a4b5' },
        { id: 2, title: 'Project 2', link: "https://anupdhoble.github.io/spotifyproject/" },
        { id: 3, title: 'Project 3', link: "https://anupdhoble.github.io/spotifyproject/" }
    ];

    return (
        <div className='footercorrect'>
            <div className='projects'>
                <h1>Under Maintenance🪛</h1>
                {projects.map((project) => {
                    return (
                        <div className="projectContainer">
                            <div className="project_title">
                                <span><p>{project.title}</p></span>
                                <span><a href={project.link} target="_blank" rel="noopener noreferrer">Visit🔗</a></span>
                            </div>
                            <div className="project_content">
                                <div className="content_left">
                                    <p>{project.description}</p>
                                </div>
                                {project.img_link && 
                                <div className="content_right">
                                    <img src={project.img_link} alt="project_image" target="_blank" rel="noopener noreferrer"/>
                                </div>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Projects
