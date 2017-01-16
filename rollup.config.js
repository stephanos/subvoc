import babel from 'rollup-plugin-babel';

export default {
  entry: 'static/js/analysis/components/app.es6',
  format: 'iife',
  sourceMap: false,
  globals: {
    'jquery': '$',
    'preact': 'preact'
  },
  plugins: [ babel() ],
  external: ['jquery', 'preact'],
  dest: 'static/js/analysis/1.app.js'
};
