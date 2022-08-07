/* eslint-disable react/prop-types */
import Wrapper from './Wrapper';
import Heading from '../../shared/texts/Heading';
import Paragraph from '../../shared/texts/Paragraph';
import SocialIcon from '../../shared/icons/SocialIcon';
import Anchor from '../../shared/Anchor';

const Contact = props => (
  <Wrapper>
    <div className="heading">
      <Heading text="Let's work together!" />
    </div>
    <Paragraph>
      Think we click? Shoot me an
      {' '}
      <Anchor url="mailto:taiseiyamadashindosu@gmail.com" text="email" />
      {' '}
      or slide a DM to my socials.
    </Paragraph>
    <div className="socials">
      {props.contents.map(social => <SocialIcon key={social.name} social={social} />)}
    </div>
  </Wrapper>
);

export default Contact;
