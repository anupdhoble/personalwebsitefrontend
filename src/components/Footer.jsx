export default function Footer({isNavbarActive,toggleNavbar}) {
    return(
        <>
           
        <footer className={`footer ${isNavbarActive ? 'active' : ''}`}>
            <div className="hr-nav m-auto">
                <hr />
            </div>
            <div className={`foot ${isNavbarActive ? 'active' : ''}`}>
                <div className="footer max-width-2 m-auto">
                Copyright © 2023 Anup Dhoble. All rights reserved.
                </div>
                <button  id="scrollup">&uarr;</button>
            </div>
        </footer>
        </>
    )
};
