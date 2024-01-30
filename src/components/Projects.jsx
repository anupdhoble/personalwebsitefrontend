import React from 'react'
import '../styles/projects.css'

function Projects() {
    const projects = [
        { id: 1, title: 'K means Clustering for Image Compression', link: "https://anupdhoble.github.io/spotifyproject/", description: 'This project explores the use of K means clustering algorithm for image compression. It demonstrates how the algorithm can be applied to reduce the size of images while preserving their visual quality. Visit the link to learn more about the project.This project demonstrates the implementation of the K-Means algorithm for image compression using React.js. K-Means clustering allows us to significantly reduce the number of colors in an image, leading to efficient compression while maintaining image quality.',img_link:'https://github.com/anupdhoble/K-meansClustering/blob/master/Screenshot%202023-10-22%20121833.png?raw=true' },
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
