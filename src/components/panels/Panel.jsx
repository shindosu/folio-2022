/* eslint-disable react/prop-types */
import CloseIcon from '@material-ui/icons/Close';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Default from './contents/Default';
import Contact from './contents/Contact';
import Works from './contents/Works';
import Credit from './contents/Credit';

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
      case 'credit':
        return <Credit contents={sectionContents} />;
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
    <>
      <button className="point outer-circle" id={`outer-point-${sectionName}`} onClick={() => togglePanel(true)} onKeyDown={() => togglePanel(true)} type="button">
        <div className="inner-circle" id={`inner-point-${sectionName}`} />
      </button>
      <div className={`panel ${currentPointClicked ? 'show' : ''}`}>
        <div className="close-icon-wrapper">
          <CloseIcon className="icon-close" onClick={() => togglePanel(false)} onKeyDown={() => togglePanel(false)} />
        </div>
        <div className={`contents-wrapper ${sectionName === 'works' ? 'works' : ''}`}>
          {contents(sectionContents)}
        </div>
        <div className="navigation-footer">
          <div className="navigation-icon" id={`previous-${toSection('previous')}`} onClick={() => togglePanelForSection('previous')} onKeyDown={() => togglePanelForSection('previous')} role="presentation">
            <ChevronLeft className="icon-chevron" />
            {' '}
            <span>{toSection('previous').upCase()}</span>
          </div>
          <div className="navigation-icon" id={`next-${toSection('next')}`} onClick={() => togglePanelForSection('next')} onKeyDown={() => togglePanelForSection('next')} role="presentation">
            <span>{toSection('next').upCase()}</span>
            {' '}
            <ChevronRight className="icon-chevron" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;
