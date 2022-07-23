import { useState } from 'react';

const Navbar = () => {
  const navLinks = ['Home', 'About', 'Philosophy', 'Works', 'Contact', 'Credits'];
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  return (
    <>
      <nav>
        <button className={`hamburger hamburger--collapse ${hamburgerClicked ? 'is-active' : ''}`} type="button" onClick={() => setHamburgerClicked(!hamburgerClicked)}>
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </nav>
      <div className={`menu ${hamburgerClicked ? 'is-active' : ''}`}>
        <ul>
          {navLinks.map(navLink => <li className="nav-links" id={`nav-${navLink.toLowerCase()}-link`} key={navLink}>{navLink}</li>)}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
