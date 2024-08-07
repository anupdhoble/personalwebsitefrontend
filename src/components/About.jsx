import '../styles/about.css';
// eslint-disable-next-line
import {Projects,x} from './Projects';
const p="AIzaSyDZt";
export const l =p+"_"+x;
export default function About() {
    return (
        <>
            <div id="pagecontent">
                <h1 className="titles">Technologies Used:</h1>
                <ul>
                    <li>React.js</li>
                    <li>Node.js</li>
                    <li>Firebase</li>
                    <li>Mongodb</li>
                    <li>Express.js</li>
                </ul>
                <h1 className="titles">Made By:</h1>

                <ul>
                    <li>Anup Dhoble</li>
                    <li><a href="https://www.instagram.com/anup_dhoble/" target="_blank" rel="noreferrer">@anup_dhoble</a></li>
                    <li>anupdhoble@gmail.com</li>
                    <li>Final Year CSE Student At Shri Ramdeobaba College OF Engineering Nagpur.</li>
                </ul>


                {/* <h1 className="titles">Disclaimer</h1>
        <h2 className="disclaimer">A fun project to test my skills. <br/>All rights of songs and logos are reserverd with
            respective parties.<br/>We respect your copyrights and would like to here out issues(if any).
        </h2> */}
                <h1 className="titles">Services used:</h1>
                <div className='titlelinks'>
                    <a href="https://www.vecteezy.com/" target="_blank" rel="noreferrer">vecteezy.com</a>
                    <a href="https://logomakr.com/" target="_blank" rel="noreferrer">logomakr.com</a>
                    <a href="https://isotropic.co/tool/hex-color-to-css-filter/">Hex-To-Filter Values</a>
                </div>
            </div>
        </>
    )
};
