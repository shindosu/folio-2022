/* eslint-disable react/prop-types */
import Wrapper from './Wrapper';
import Heading from '../../shared/texts/Heading';
import Paragraph from '../../shared/texts/Paragraph';
import Anchor from '../../shared/Anchor';

const Credit = props => {
  const { contents } = props;

  return (
    <Wrapper>
      <div className="heading">
        <Heading text="Thank you for Visiting!" />
      </div>
      <Paragraph>
        Before we part, special thanks to the anonymous creators on the
        internet that made crafting this website possible!
      </Paragraph>
      <div className="sources">
        {contents.map(content => (
          <div key={content.work} className="source">
            <span>
              {content.work}
              {' '}
              -
              {' '}
            </span>
            <Anchor url={content.url} text={content.author} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Credit;
