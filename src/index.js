const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function rewireFlatStaticFolder(config, env) {
  const cssFilenameTemplate = 'static/[name].[contenthash:8].css'
  const jsFilenameTemplate = 'static/[name].[contenthash:8].js'
  const mediaFilenameTemplate = 'static/[name].[contenthash:8].[ext]'

  const plugins = ((config && config.plugins) || []).map((a) => {
    if (a instanceof MiniCssExtractPlugin) {
      return new MiniCssExtractPlugin({
        ...a.options,
        filename: cssFilenameTemplate,
        chunkFilename: cssFilenameTemplate
      });
    }

    return a;
  });

  const rules = ((config && config.module && config.module.rules) || []).map(
    (a) => {
      if (a && Array.isArray(a.oneOf)) {
        return {
          oneOf: a.oneOf.map((b) => {
            if (
              b &&
              b.loader &&
              (b.loader.indexOf('url-loader') >= 0 ||
                b.loader.indexOf('file-loader') >= 0)
            ) {
              return {
                ...b,
                options: {
                  ...(b.options || {}),
                  name: mediaFilenameTemplate,
                },
              };
            }

            return b;
          }),
        };
      }

      return a;
    },
  );

  return {
    ...config,
    output: {
      ...config.output,
      filename: jsFilenameTemplate,
      chunkFilename: jsFilenameTemplate
    },
    plugins,
    module: {
      ...config.module,
      rules
    },
  };
}

module.exports = rewireFlatStaticFolder;
