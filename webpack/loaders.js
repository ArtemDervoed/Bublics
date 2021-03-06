const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isDev = process.env.APP_ENV === 'development';

module.exports = [
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint',
    options: { failOnError: false },
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    options: {
      cacheDirectory: false,
    },
  },
  {
    test: /\.(scss|sass)$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css',
        options: {
          importLoaders: 1,
          sourceMap: true,
          context: path.join(process.cwd(), './src'),
          localIdentName: '[name]__[local]--[hash:base64:5]',
          minimize: !isDev,
        },
      },
      { loader: 'postcss', options: { sourceMap: true } },
      {
        loader: 'sass',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
          sourceMapContents: !isDev,
        },
      },
    ],
  },
  {
    test: /\.(frag|vert|glsl)$/,
    use: [
      {
        loader: 'glsl-shader-loader',
        options: {}
      },
    ],
  },
  {
    test: /\.(woff2?|ttf|eot)$/,
    loader: 'file',
    options: { name: '[name].[hash:8].[ext]' },
  },
  {
    test: /\.(gif|png|svg|jpe?g|webp)$/,
    loader: 'file',
    options: { name: '[name].[hash:8].[ext]' },
  },
];
