import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/widget.ts',
    output: {
      dir: 'build',
      format: 'umd'
    },
    plugins: [typescript(), resolve(), commonjs()]
  },
  {
    input: './src/order-tracking.ts',
    output: {
      dir: 'build',
      format: 'umd'
    },
    plugins: [typescript(), resolve(), commonjs()]
  }
];
