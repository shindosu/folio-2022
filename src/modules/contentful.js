const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_ENV_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master'
});

const contentType = text => {
  switch (text) {
    case 'works':
      return 'project';
    case 'contact':
      return 'social';
    case 'credit':
      return 'source';

    default:
      return text;
  }
};

const getEntries = text => client
  .getEntries({ content_type: contentType(text) });

export default getEntries;
