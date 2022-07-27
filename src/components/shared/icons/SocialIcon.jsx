/* eslint-disable react/prop-types */
import { Instagram, LinkedIn, YouTube } from '@material-ui/icons';

const SocialIcon = props => {
  const { social } = props;

  const icon = name => {
    switch (name) {
      case 'Instagram':
        return <Instagram className="icon-social" />;
      case 'LinkedIn':
        return <LinkedIn className="icon-social" />;
      default:
        return <YouTube className="icon-social" />;
    }
  };

  return (
    <a href={social.url} target="_blank" rel="noreferrer">
      {icon(social.name)}
    </a>
  );
};

export default SocialIcon;
