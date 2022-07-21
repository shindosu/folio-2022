/* eslint-disable react/prop-types */

import { useState } from 'react';
import client from '../../modules/contentful';
import Anchor from '../Anchor';

const Panel = props => {
  const { sectionName, currentPointClicked, setCurrentPointClicked, otherPointStates } = props;

  const [sectionContents, setSectionContents] = useState([]);

  const contentfulModels = ['about', 'philosophy', 'work'];

  const togglePanel = boolean => {
    otherPointStates.forEach(otherPointState => {
      if (otherPointState.pointClicked) otherPointState.setPointClicked(false);
    });

    setCurrentPointClicked(boolean);

    fetchPanelContents();
  };

  const fetchPanelContents = () => {
    if (sectionContents.length === 0 && contentfulModels.includes(sectionName)) {
      client.getEntries({ content_type: sectionName }).then(response => {
        setSectionContents(response.items.map(panelContent => panelContent.fields));
      }).catch(err => {
        console.log(err);
      });
    }
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
