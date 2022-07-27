/* eslint-disable */

import { useState } from 'react';

const Navbar = props => {
  const { sections, otherPointStates, fetchPanelContents } = props;
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  const togglePanel = sectionName => {
    otherPointStates(sectionName).forEach(otherPointState => {
      if (otherPointState.pointClicked) otherPointState.setPointClicked(false);
    });

    if (sectionName === 'home') return;

    const section = sections.find(sectionData => sectionData.name === sectionName);

    setTimeout(() => {
      section.setPointClicked(true);
      fetchPanelContents(sectionName, section.contents, section.setContents);
    }, 1000);
  };

  return (
    <>
      <nav>
        <button className={`hamburger hamburger--collapse ${hamburgerClicked ? 'is-active' : ''}`} type="button" onClick={() => setHamburgerClicked(!hamburgerClicked)}>
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </nav>
      <div className={`menu ${hamburgerClicked ? 'show' : ''}`}>
        <ul>
          <li
            className="nav-link"
            id="nav-home-link"
            onClick={() => togglePanel('home')}
            onKeyDown={() => togglePanel('home')}
            role="presentation"
          >
            Home
          </li>
          {sections.map(section => (
            <li
              className="nav-link"
              id={`nav-${section.name}-link`}
              key={section.name}
              onClick={() => togglePanel(section.name)}
              role="presentation"
            >
              {section.name[0].toUpperCase() + section.name.slice(1).toLowerCase()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
