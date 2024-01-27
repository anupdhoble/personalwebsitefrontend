import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/utility.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import { Helmet } from 'react-helmet';
import Contact from './components/Contact';
import Blogs from './components/Blogs';
import Bloglogin from './components/Bloglogin';
import CreateBlog from './components/CreateBlog';
import Projects from './components/Projects';
import POM from './components/POM';


function App() {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isLogin,setIsLogin]=useState(localStorage.getItem("isLogin"));

    const toggleNavbar = () => {
        setIsNavbarActive((prevValue) => !prevValue);
    };

    const closeTheMenu=()=>{
      setIsNavbarActive(false);
    }
  useEffect(() => {
    let scrollupbtn = document.getElementById("scrollup");
    scrollupbtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  })

  return (
    
      
    <Router>
      <Helmet>
        <title>Anup Dhoble || Portfolio</title>
      </Helmet>
      <Header isNavbarActive={isNavbarActive} toggleNavbar={toggleNavbar} closeTheMenu={closeTheMenu}/>
      <Routes>
        {/* Define your routes here */}
        <Route path="/home" element={<Home isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path="/" element={<Home isLogin={isLogin}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/projects" element={<Projects />}/>
        <Route path="/blogs" element={<Blogs isLogin={isLogin}/>}/>
        <Route path="/blogs/login" element={<Bloglogin isLogin={isLogin} setIsLogin={setIsLogin}/>}/>
        <Route path="/blogs/create" element={<CreateBlog isLogin={isLogin}/>}/>
        <Route path="*" element={<POM/>}/>
      </Routes>
      <Footer isNavbarActive={isNavbarActive} toggleNavbar={toggleNavbar} />
    </Router>
    
  );
}

export default App;
