const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_ENV_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master'
});

export default client;
