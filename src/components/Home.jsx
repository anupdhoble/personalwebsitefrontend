import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import photo from '../assets/img/anup.png';
import '../styles/home.css'; // Import your home component styles here

export default function Home({ isLogin }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const content = "MERN Stack developer...";
    const handleContact = () => {
        window.scrollTo(0, 0);
        navigate('/contact');
    }

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
            <div  onClick={handleContact} className="contactbutton">
                <div>Contact Me</div>
            </div>
        </div>
    );
}
