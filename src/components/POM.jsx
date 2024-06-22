// POM - Page On Maintainance
import React, { useState,useEffect } from 'react';
import "../styles/pom.css"
import maintainenceimg from "../assets/img/maintainence.gif";
import dreamerSong from "../assets/audio/Dreamer-AlanWalker-NCS.mp3";
import img404 from "../assets/img/404.jpg";

export default function POM() {
    const [isPlaying,setIsPlaying]=useState(false);
    
    
    const audiosource = dreamerSong;
    useEffect(() => {
        const audioElement = document.getElementById('audio-element');
        audioElement.volume = 0.5; // Set default volume here
    }, []);
    const toggleAudio=()=>{
        const audioElement =document.getElementById('audio-element');
        if(isPlaying){
            audioElement.pause();
        }
        else{
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    }



    
    const playpausebtn={
        fontSize:'1.5rem',
        margin:'10px'
    }


    return (
        <div id="music-master">
            <img src={img404}  className='page404' width="50%" alt='404'/>
            <h2>Page Not Found Or Under Maintainence🛠️</h2><br />
            <button type="button" style={playpausebtn} onClick={toggleAudio}>
                {isPlaying ? '⏸️': '▶️'}
            </button>
            
            
            <audio id="audio-element"  src={audiosource}  />


            <img src={maintainenceimg} className='pomImage' alt='Page Under Maintainence'/>
            <p>Other pages are running normally.</p>
            <p>Until Then:</p>
            <a target="_blank" rel="noreferrer" href="https://anupdhoble.github.io/spotifyproject/"><button
                type="button">Spotify clone🔗</button></a>
        </div>
    );
};
