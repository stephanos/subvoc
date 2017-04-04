import babel from 'rollup-plugin-babel';

export default {
  entry: 'static/js/app/components/init.es6',
  format: 'iife',
  sourceMap: false,
  globals: {
    'classnames': 'classNames',
    'jquery': '$',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-slick': 'Slider'
  },
  plugins: [ babel() ],
  external: ['classnames', 'jquery', 'react', 'react-dom', 'react-slick'],
  dest: 'static/js/app/app.js'
};
