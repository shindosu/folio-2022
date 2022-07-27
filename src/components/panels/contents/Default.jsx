/* eslint-disable react/prop-types */
import Wrapper from './Wrapper';
import Heading from '../../shared/texts/Heading';
import Paragraph from '../../shared/texts/Paragraph';
import Image from '../../shared/Image';

const Default = props => {
  const { contents } = props;

  return (
    <>
      {
        contents.map(content => (
          <Wrapper key={content.title}>
            { (content.mainImage) ? <Image url={content.mainImage.fields.file.url} /> : '' }
            <div className="heading">
              <Heading text={content.title} />
            </div>
            <Paragraph>
              {content.description}
            </Paragraph>
          </Wrapper>
        ))
      }
    </>
  );
};

export default Default;
