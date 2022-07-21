import { useState } from 'react';
import Panel from './Panel';

const Panels = () => {
  const [aboutPointClicked, setAboutPointClicked] = useState(false);
  const [philosophyPointClicked, setPhilosophyPointClicked] = useState(false);
  const [workPointClicked, setWorkPointClicked] = useState(false);
  const [contactPointClicked, setContactPointClicked] = useState(false);
  const [creditPointClicked, setCreditPointClicked] = useState(false);

  const sectionStates = [
    {
      name: 'about',
      pointClicked: aboutPointClicked,
      setPointClicked: setAboutPointClicked
    },
    {
      name: 'philosophy',
      pointClicked: philosophyPointClicked,
      setPointClicked: setPhilosophyPointClicked
    },
    {
      name: 'work',
      pointClicked: workPointClicked,
      setPointClicked: setWorkPointClicked
    },
    {
      name: 'contact',
      pointClicked: contactPointClicked,
      setPointClicked: setContactPointClicked
    },
    {
      name: 'credit',
      pointClicked: creditPointClicked,
      setPointClicked: setCreditPointClicked
    }
  ];

  const otherPointStates = sectionName => sectionStates
    .filter(sectionState => sectionState.name !== sectionName)
    .map(sectionState => ({
      pointClicked: sectionState.pointClicked,
      setPointClicked: sectionState.setPointClicked
    }));

  return (
    sectionStates.map(sectionState => (
      <Panel
        key={sectionState.name}
        sectionName={sectionState.name}
        currentPointClicked={sectionState.pointClicked}
        setCurrentPointClicked={sectionState.setPointClicked}
        otherPointStates={otherPointStates(sectionState.name)}
      />
    ))
  );
};

export default Panels;
