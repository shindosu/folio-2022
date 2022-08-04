/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Default from './contents/Default';
import Contact from './contents/Contact';
import Works from './contents/Works';
import Credits from './contents/Credits';
import LazyLoader from './contents/LazyLoader';

const Panel = props => {
  const {
    sectionName,
    navigationTexts,
    currentPointClicked,
    setCurrentPointClicked,
    sectionContents,
    setSectionContents,
    otherPointStates,
    fetchPanelContents
  } = props;

  const [loadedImage, setLoadedImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const panel = useRef();

  useEffect(() => {
    if (sectionContents.length > 0) {
      if (['philsophy', 'contact', 'credits'].includes(sectionName)) setLoaded(true);

      const totalImages = sectionContents.filter(content => content.mainImage || content.thumbnail);
      if (loadedImage === totalImages.length) setLoaded(true);
    }
  }, [loadedImage, sectionContents]);

  const togglePanel = clicked => {
    otherPointStates(sectionName).forEach(otherPointState => {
      if (otherPointState.pointClicked) otherPointState.setPointClicked(false);
    });
    if (!clicked) setCurrentPointClicked(clicked);

    setTimeout(() => {
      if (clicked) setCurrentPointClicked(clicked);
      fetchPanelContents(sectionName, sectionContents, setSectionContents);
    }, 1000);
  };

  const contents = () => {
    switch (sectionName) {
      case 'works':
        return <Works contents={sectionContents} />;
      case 'contact':
        return <Contact contents={sectionContents} />;
      case 'credits':
        return <Credits contents={sectionContents} />;
      default:
        return <Default contents={sectionContents} />;
    }
  };

  const toSection = direction => {
    if (typeof navigationTexts[direction] === 'string') return navigationTexts[direction];

    return navigationTexts[direction].name;
  };

  const togglePanelForSection = direction => {
    setCurrentPointClicked(false);

    const sectionPanel = navigationTexts[direction];

    if (sectionPanel === 'home') return;

    setTimeout(() => {
      sectionPanel.setPointClicked(true);
      fetchPanelContents(
        sectionPanel.name,
        sectionPanel.contents,
        sectionPanel.setContents
      );
    }, 1000);
  };

  return (
    <div className={`panel ${currentPointClicked ? 'show' : ''}`}>
      <div className="close-icon-wrapper">
        <CloseIcon className="icon-close home" onClick={() => togglePanel(false)} onKeyDown={() => togglePanel(false)} />
      </div>
      { loaded ? '' : <LazyLoader />}
      <div className={`contents-wrapper ${sectionName === 'works' ? 'works' : ''} ${loaded ? 'loaded' : ''}`} ref={panel} onLoad={() => setLoadedImage(loadedImage + 1)}>
        {contents(sectionContents)}
      </div>
      <div className="navigation-footer">
        <div className={`navigation-icon ${toSection('previous')}`} id={`previous-${toSection('previous')}`} onClick={() => togglePanelForSection('previous')} onKeyDown={() => togglePanelForSection('previous')} role="presentation">
          <ChevronLeft className="icon-chevron" />
          {' '}
          <span>{toSection('previous').upCase()}</span>
        </div>
        <div className={`navigation-icon ${toSection('next')}`} id={`next-${toSection('next')}`} onClick={() => togglePanelForSection('next')} onKeyDown={() => togglePanelForSection('next')} role="presentation">
          <span>{toSection('next').upCase()}</span>
          {' '}
          <ChevronRight className="icon-chevron" />
        </div>
      </div>
    </div>
  );
};

export default Panel;
