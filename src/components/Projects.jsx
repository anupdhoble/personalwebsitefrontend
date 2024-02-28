import React from 'react'
import '../styles/projects.css'

function Projects() {
    const projects = [
        { id: 1, title: 'Shopping List App', link: "https://anupdhoble.github.io/shopping_list/", description: 'This is a simple web application that allows you to create a shopping list and store it in a Firebase Realtime Database. You can add items to the list, delete items by double-clicking on them, and the changes will be reflected in the database.',img_link:'https://private-user-images.githubusercontent.com/83175840/308573280-34a4553e-bfe5-4136-bbb1-be5a2e11a4b5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDkxNDYzNTIsIm5iZiI6MTcwOTE0NjA1MiwicGF0aCI6Ii84MzE3NTg0MC8zMDg1NzMyODAtMzRhNDU1M2UtYmZlNS00MTM2LWJiYjEtYmU1YTJlMTFhNGI1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjI4VDE4NDczMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE3MGQwZjZhM2E3MzYyNzM3YTM1M2UzNDJjMzM3ZGNlMTg3ODMwMmE0NWNhZTgxNmI1YmM2ODcyYjJlNmExODMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.SUSUZGfZZyeZfe1EWRi0RIt4xu2LXSmpfQNIczMb-2M' },
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
