//Remember!!!! i have used elfsight for music and added a script at index.html in public , remeber to remove it when in future i wish to remove the widget 
import React, { useEffect, useState } from 'react';
import '../styles/music.css'; 
import { LineWave } from 'react-loader-spinner';

export default function Music() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); 

        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='musicApp'>
            <div>{loading && (
                <div className='loading-spinner'>
                    <LineWave
                        className='loading-spinner'
                        visible={true}
                        height="150"
                        width="150"
                        color="var(--color1)"
                        ariaLabel="line-wave-loading"
                        
                    />
                   
                </div>
            )}</div>
                <div className="elfsight-app-25670a45-fcbc-4429-a0e8-1e47a41ec179" data-elfsight-app-lazy></div>
            
        </div>
    );
}
