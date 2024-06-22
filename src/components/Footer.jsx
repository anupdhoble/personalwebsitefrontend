import '../styles/utility.css';

export default function Footer({ isNavbarActive, toggleNavbar }) {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          {/* Your main content goes here */}
        </div>
        <footer className={`footer ${isNavbarActive ? 'active' : ''}`}>
          <div className="hr-nav m-auto">
            <hr />
          </div>
          <div className={`foot ${isNavbarActive ? 'active' : ''}`}>
            <div className="footer max-width-2 m-auto">
              Copyright © 2024 Anup Dhoble. All rights reserved.
            </div>
            <button id="scrollup">&uarr;</button>
          </div>
        </footer>
      </div>
    </>
  );
}
