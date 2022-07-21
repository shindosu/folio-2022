/* eslint-disable react/prop-types */

const Anchor = props => {
  const { url, anchorText } = props;

  return (
    <a href={url} target="_blank" rel="noreferrer">{anchorText}</a>
  );
};

export default Anchor;
