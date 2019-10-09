/* eslint-disable import/no-extraneous-dependencies */
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
    }),
    autoprefixer,
    cssnano,
  ],
};
