module.exports = function override(config, env) {
  console.log(env);
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
        // so we need to add purs-loader before that fallback.
        // see: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js#L220-L236
        oneOf: [
          {
            test: /\.(glsl|vs|fs|vert|frag)$/,
            type: 'asset/source'
          },
          ...rule.oneOf
        ]
      };
    }

    return rule;
  });

  // create-react-app disallows us to import files outside ./src folder.
  // We need to turn this rule off to import files from ./bower_components
  // see: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js#L112-L119
  if (process.env.NODE_ENV === 'development') {
    config.resolve.plugins = [];
  }

  return config;
};
