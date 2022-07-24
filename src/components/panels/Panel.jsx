/* eslint-disable */

import Anchor from '../Anchor';

const Panel = props => {
  const {
    sectionName,
    currentPointClicked,
    setCurrentPointClicked,
    sectionContents,
    setSectionContents,
    otherPointStates,
    fetchPanelContents
  } = props;

  const togglePanel = boolean => {
    otherPointStates(sectionName).forEach(otherPointState => {
      if (otherPointState.pointClicked) otherPointState.setPointClicked(false);
    });

    setCurrentPointClicked(boolean);

    fetchPanelContents(sectionName, sectionContents, setSectionContents);
  };

  return (
    <>
      <button className="point outer-circle" id={`point-${sectionName}`} onClick={() => togglePanel(true)} onKeyDown={() => togglePanel(true)} type="button">
        <div className="inner-circle" />
      </button>
      <div className={`panel ${currentPointClicked ? 'show' : ''}`}>
        <button onClick={() => togglePanel(false)} onKeyDown={() => togglePanel(false)} type="button">CLOSE</button>
        {sectionContents.map(sectionContent => (
          <div key={sectionContent.title} className="content">
            { (sectionContent.mainImage) ? <img src={sectionContent.mainImage.fields.file.url} alt="main" /> : '' }
            <h1>{sectionContent.title}</h1>
            { (sectionContent.dateOfSubmission) ? <p>{sectionContent.dateOfSubmission}</p> : '' }
            <p>{sectionContent.description}</p>
            { (sectionContent.url) ? <Anchor sectionName={sectionName} anchorText="Visit Project" url={sectionContent.url} /> : '' }
          </div>
        ))}
      </div>
    </>
  );
};

export default Panel;
