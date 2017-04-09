import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'static/js/app/components/init.es6',
  format: 'iife',
  dest: 'static/js/app/app.js',
  sourceMap: false,
  globals: {
    'classnames': 'classNames',
    'jquery': '$',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-slick': 'Slider'
  },
  external: ['classnames', 'jquery', 'react', 'react-dom', 'react-slick'],
  plugins: [
    babel({
      babelrc: false,
      plugins: [
          "external-helpers",
          "transform-react-jsx"
      ],
      presets: [
        [ "es2015", { "modules": false } ]
      ],
      exclude: 'node_modules/**'
    }),
    resolve({ 
      jsnext: true, 
      main: true 
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    cjs(),
  ]
};
