/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');


const { CompiledExtractPlugin } = require('@compiled/webpack-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const extractCSS = true;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  target:'node',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
          {
            loader: '@compiled/webpack-loader',
            options: {
              extract: extractCSS,
              extensions: ['.js', '.jsx'],
              parserBabelPlugins: ['jsx'],
              transformerBabelPlugins: ['@babel/plugin-syntax-jsx'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [extractCSS ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
    ].filter(Boolean),
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist'),
  },
  plugins: [
    ...(extractCSS
      ? [new MiniCssExtractPlugin({ filename: '[name].css' }), new CompiledExtractPlugin()]
      : []),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  externals: [nodeExternals({ allowlist: (moduleName) => {
    return moduleName.startsWith('@compiled');
  } })]
};
