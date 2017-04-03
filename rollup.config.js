import babel from 'rollup-plugin-babel';

export default {
  entry: 'static/js/analysis/components/init.es6',
  format: 'iife',
  sourceMap: false,
  globals: {
    'jquery': '$',
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [ babel() ],
  external: ['jquery', 'react', 'react-dom'],
  dest: 'static/js/analysis/app.js'
};
