/* eslint-disable react/prop-types */

const Anchor = props => {
  const { url, text } = props;

  return (
    <a href={url} target="_blank" rel="noreferrer">{text}</a>
  );
};

export default Anchor;
