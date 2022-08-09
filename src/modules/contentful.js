const contentful = require('contentful');

console.log(process.env.REACT_APP_APPLICATION_ENVIRONMENT);

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_ENV_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.REACT_APP_APPLICATION_ENVIRONMENT
});

const contentType = text => {
  switch (text) {
    case 'works':
      return 'project';
    case 'contact':
      return 'social';
    case 'credits':
      return 'source';

    default:
      return text;
  }
};

const order = text => {
  if (text === 'works') return '-sys.createdAt';

  return 'sys.createdAt';
};

const getEntries = text => client
  .getEntries({ content_type: contentType(text), order: order(text) });

export default getEntries;
