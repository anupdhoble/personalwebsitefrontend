import resume from '../assets/documents/Anup_Resume.pdf';
import '../styles/resume.css';


export default function Resume() {
    return (
        <div className="footercorrect">
            <div className="resumecontainer">
                <embed src={resume} width="600" height="800" type='application/pdf' />
            </div>

        </div>
    )
}
