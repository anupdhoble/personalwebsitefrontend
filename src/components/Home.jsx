import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import photo from '../assets/img/anup.png';
// import downarrow from '../assets/img/down.gif';
import '../styles/home.css'; // Import your home component styles here
import githublogo from '../assets/img/github.png';
import linkedinlogo from '../assets/img/linkedin.png';
import maillogo from '../assets/img/email.png';
import codecheflogo from '../assets/img/codechef.svg';
import instagramlogo from '../assets/img/instagram.png';
import leetcodelogo from '../assets/img/leetcode.png';
import twitterlogo from '../assets/img/twitter.png';
import youtubelogo from '../assets/img/youtube.png';

export default function Home({ isLogin }) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const content = "MERN Stack developer...";
    // const navigate = useNavigate();
    // const handleContact = () => {
    //     window.scrollTo(0, 0);
    //     navigate('/contact');
    // }


    useEffect(() => {
        const interval = setInterval(() => {
            setText(content.substring(0, index));
            setIndex(index => index + 1);
        }, 100); // Adjust the typing speed here (milliseconds)

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="footercorrect">
            <div className="homecontainer">
                <div className="home_left">
                Hi👋, I'm Anup,<br/>a passionate {text} <span className="cursor">|</span><br/>and ML enthusiast from India.
                    
                </div>
                <div className="home_right">
                    <img src={photo} alt="" />
                </div>
            </div>
            
            {/* {<div  onClick={handleContact} className="contactbutton"> */}
                {/* <div>Contact Me</div> */}
            {/* </div>} */}
            {/* <div className="downarrow">
                <img src={downarrow} alt="" />
            </div> */}
            <div id="contactsLinks">
                <a href="https://www.linkedin.com/in/anupdhoble/" target="_blank" rel="noopener noreferrer" > <img className="contactLogos" src={linkedinlogo} alt="Linkedin"/></a>
                <a href="https://github.com/anupdhoble" target="_blank" rel="noopener noreferrer"> <img className="contactLogos" src={githublogo} alt="github"/></a>
                <a href="https://x.com/dhoble_anup" target="_blank" rel="noopener noreferrer"> <img className="contactLogos" src={twitterlogo} alt="twitter"/></a>
                <a href="mailto:anupdhoble15@gmail.com" rel="noopener noreferrer"> <img className="contactLogos" src={maillogo} alt="email"/></a>
                <a href="https://leetcode.com/anupdhoble/" target="_blank" rel="noopener noreferrer"> <img className="contactLogos" src={leetcodelogo} alt="leetcode"/></a>
                <a href="https://youtube.com/@anupdhoble2879?si=g_vLTbwWw2dxlGXQ" target="_blank" rel="noopener noreferrer"> <img className="contactLogos" src={youtubelogo} alt="youtube"/></a>
                <a href="https://www.instagram.com/anup_dhoble/" target="_blank" rel="noopener noreferrer"> <img className="contactLogos" src={instagramlogo} alt="insta"/></a>
                <a href="https://www.codechef.com/users/anupdhoble" target="_blank" rel="noopener noreferrer"> <img id="codechefLogo" className="contactLogos" src={codecheflogo} alt="codechef"/></a>
            </div>
        </div>
    );
}
