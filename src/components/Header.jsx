import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/header.css'
import logo from '../assets/img/logo.ico';


export default function Header({ isNavbarActive, toggleNavbar, closeTheMenu }) {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    const navigate = useNavigate();
    const handleResume = () => {
        window.scrollTo(0, 0);
        navigate('/resume');
    }
    return (
        <>
            <nav className={`navbar ${isNavbarActive ? 'active' : ''}`}>
                <Link className={`${location.pathname === "/home" ? 'highlightNavoption' : ''}`} to="/" onClick={closeTheMenu}><img src={logo} alt="Hello" id="logo" /></Link>
                <span>Anup Dhoble</span>
                <ul className="list_nav">

                    <li><Link className={`${location.pathname === "/" ? 'highlightNavoption' : ''}`} to="/" onClick={closeTheMenu}>Home</Link></li>
                    <li><Link className={`${location.pathname === "/blogs" ? 'highlightNavoption' : ''}`} to="/blogs" onClick={closeTheMenu}>Blogs</Link></li>
                    <li><Link className={`${location.pathname === "/music" ? 'highlightNavoption' : ''}`} to="/music" onClick={closeTheMenu}>Music</Link></li>
                    <li><Link className={`${location.pathname === "/projects" ? 'highlightNavoption' : ''}`} to="/projects" onClick={closeTheMenu}>Projects</Link></li>
                    <li><Link className={`${location.pathname === "/about" ? 'highlightNavoption' : ''}`} to="/about" onClick={closeTheMenu}>About</Link></li>
                    <li><Link className={`${location.pathname === "/contact" ? 'highlightNavoption' : ''}`} to="/contact" onClick={closeTheMenu}>Feedback</Link></li>

                </ul>
                <div onClick={handleResume} className="resumebutton">
                    <div>Resume</div>
                </div>
                <div className="toggle_btn" onClick={toggleNavbar}>
                    <i className="fa-solid fa-bars" style={{ color: '#05386b' }}></i>
                    <i className="fa-solid fa-xmark" style={{ color: '#05386b' }}></i>
                </div>
            </nav>
            {/* <div className="hr-nav m-auto">
                <hr />
            </div> */}
        </>
    );
}
