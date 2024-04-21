import React from 'react'
import '../styles/projects.css'

function Projects() {
    const projects = [
        { id: 1, title: 'Signature Verification System using CNN', link: "https://github.com/anupdhoble/6thSemProject_SignatureVerification", description: 'Our project addresses the challenge of small datasets by employing ResNet50 as a transfer learning model. Model is trained on CEDAR data set which has a collection of >2000 signatures. Deployed on Django for the backend and React.js for the frontend, our solution offers seamless integration and user-friendly interaction. Additionally, the app supports signature storage for future training, ensuring scalability and continuous improvement.',img_link:'https://firebasestorage.googleapis.com/v0/b/fir-d0405.appspot.com/o/projects%2FScreenshot%202024-04-21%20090134.png?alt=media&token=ddeb8518-c8d4-4fbc-b865-a5b38fbe0c7f' },
        { id: 2, title: 'Shopping List App', link: "https://anupdhoble.github.io/shopping_list/", description: 'This is a simple web application that allows you to create a shopping list and store it in a Firebase Realtime Database. You can add items to the list, delete items by double-clicking on them, and the changes will be reflected in the database.',img_link:'https://firebasestorage.googleapis.com/v0/b/fir-d0405.appspot.com/o/projects%2Fimg.png?alt=media&token=e324c002-d51f-47d7-8a30-c1606d16c74d' },
        { id: 3, title: 'CalcBizPro', link: "https://anupdhoble.github.io/CalcBizPro/", description: 'Revolutionize your business with our innovative calculator app! Not only does it compute your transactions swiftly and accurately, but it also maintains a comprehensive history and offers on-the-go printing and receipt generation. Streamline your operations and stay organized effortlessly with our all-in-one solution.',img_link:'https://firebasestorage.googleapis.com/v0/b/fir-d0405.appspot.com/o/projects%2FScreenshot%202024-03-03%20104135.png?alt=media&token=09173a39-5971-48a0-8bea-761502c321d3'  }
    ];

    return (
        <div className='footercorrect'>
            <div className='projects'>
                {/* <h1>Under Maintenance🪛</h1> */}
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
