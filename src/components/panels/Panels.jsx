import { useState } from 'react';
import Panel from './Panel';
import Navbar from '../Navbar';
import getEntries from '../../modules/contentful';

const Panels = () => {
  const [aboutPointClicked, setAboutPointClicked] = useState(false);
  const [philosophyPointClicked, setPhilosophyPointClicked] = useState(false);
  const [worksPointClicked, setWorksPointClicked] = useState(false);
  const [contactPointClicked, setContactPointClicked] = useState(false);
  // const [creditPointClicked, setCreditPointClicked] = useState(false);

  const [aboutSectionContents, setAboutSectionContents] = useState([]);
  const [philosophySectionContents, setPhilosophySectionContents] = useState([]);
  const [worksSectionContents, setWorksSectionContents] = useState([]);
  const [contactSectionContents, setContactSectionContents] = useState([]);
  // const [creditSectionContents, setCreditSectionContents] = useState([]);

  const sections = [
    {
      name: 'about',
      pointClicked: aboutPointClicked,
      setPointClicked: setAboutPointClicked,
      contents: aboutSectionContents,
      setContents: setAboutSectionContents
    },
    {
      name: 'philosophy',
      pointClicked: philosophyPointClicked,
      setPointClicked: setPhilosophyPointClicked,
      contents: philosophySectionContents,
      setContents: setPhilosophySectionContents
    },
    {
      name: 'works',
      pointClicked: worksPointClicked,
      setPointClicked: setWorksPointClicked,
      contents: worksSectionContents,
      setContents: setWorksSectionContents
    },
    {
      name: 'contact',
      pointClicked: contactPointClicked,
      setPointClicked: setContactPointClicked,
      contents: contactSectionContents,
      setContents: setContactSectionContents
    }
    // {
    //   name: 'credits',
    //   pointClicked: creditPointClicked,
    //   setPointClicked: setCreditPointClicked,
    //   contents: creditSectionContents,
    //   setContents: setCreditSectionContents
    // }
  ];

  const otherPointStates = sectionName => sections
    .filter(section => section.name !== sectionName)
    .map(section => ({
      pointClicked: section.pointClicked,
      setPointClicked: section.setPointClicked
    }));

  const fetchPanelContents = (name, contents, setContents) => {
    if (contents.length === 0) {
      getEntries(name).then(response => {
        setContents(response.items.map(panelContent => panelContent.fields));
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const navigationTexts = currentSection => {
    const currentIndex = sections.indexOf(currentSection);
    const totalSections = sections.length;

    switch (currentIndex) {
      case 0:
        return {
          previous: 'home',
          next: sections[currentIndex + 1]
        };
      case totalSections - 1:
        return {
          previous: sections[totalSections - 2],
          next: 'home'
        };
      default:
        return {
          previous: sections[currentIndex - 1],
          next: sections[currentIndex + 1]
        };
    }
  };

  return (
    <>
      <Navbar
        sections={sections}
        otherPointStates={otherPointStates}
        fetchPanelContents={fetchPanelContents}
      />
      {sections.map(section => (
        <Panel
          key={section.name}
          navigationTexts={navigationTexts(section)}
          sectionName={section.name}
          currentPointClicked={section.pointClicked}
          setCurrentPointClicked={section.setPointClicked}
          sectionContents={section.contents}
          setSectionContents={section.setContents}
          otherPointStates={otherPointStates}
          fetchPanelContents={fetchPanelContents}
        />
      ))}
    </>
  );
};

export default Panels;
