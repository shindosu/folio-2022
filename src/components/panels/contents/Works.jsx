/* eslint-disable react/prop-types */
import Wrapper from './Wrapper';
import Heading from '../../shared/texts/Heading';
import Paragraph from '../../shared/texts/Paragraph';
import Image from '../../shared/Image';
import Anchor from '../../shared/Anchor';

const Works = props => {
  const { contents } = props;

  return (
    <>
      {
        contents.map(content => (
          <Wrapper key={content.title}>
            { (content.thumbnail) ? <Image url={content.thumbnail.fields.file.url} /> : '' }
            <div className="title">
              <Heading text={content.title} />
              <p className="date">{new Date(content.date).monthYear()}</p>
            </div>
            <Paragraph>{content.description}</Paragraph>
            <div className="links-wrapper">
              <Anchor url={content.url} text="Visit Project" />
            </div>
          </Wrapper>
        ))
      }
    </>
  );
};

export default Works;
