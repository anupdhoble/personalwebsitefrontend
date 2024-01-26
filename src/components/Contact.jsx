import '../styles/contact.css'
export default function Contact() {
    const handleSubmit = (e) => {
        // e.preventDefault();
        // sendEmail();
        // e.target.reset();
        // {sendEmail not defined error}
    };
    return(
        <div className='contact'>
             <form onSubmit={handleSubmit}>
            <h1>Feedback/Suggestion Form</h1>
            <fieldset>
                <label htmlFor="first-name">Enter your first name: <input type="text" id="first-name" placeholder="Tony" required/></label>
                <label htmlFor="first-name">Enter your last name: <input type="text" id="last-name" placeholder="Stank" required/></label>
                <label htmlFor="first-name">Enter your email: <input type="email" placeholder="stanlee@starkindustries.com" id="email"/></label>
                
            </fieldset>
            <fieldset>
                <label htmlFor="bio">Feedback/Suggestion:
                <textarea id="bio" name="bio" rows="3" cols="30" placeholder="What a great website..."></textarea>
                </label>
                <input type="submit" className="submitbtn" value="Submit" />

            </fieldset>
            <fieldset>
                <h2>Contact Us</h2>
                <label>Email: <a href="mailto:anupdhoble15@gmail.com">anupdhoble15@gmail.com</a></label>
                <label>Instagram: <a href="https://www.instagram.com/anup_dhoble/">@anupdhoble</a></label>
                <label>Linkedin: <a href="https://www.linkedin.com/in/anup-dhoble-b57654228/?originalSubdomain=in">Anup Dhoble</a></label>
                
            </fieldset>
        </form>
        </div>
    )
};
