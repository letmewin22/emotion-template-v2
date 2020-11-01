const ESLintPlugin = require('eslint-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin =
// require('webpack-bundle-analyzer').BundleAnalyzerPlugin


function createConfig(env) {
  const isProduction = env === 'production'

  if (env === undefined) {
    env = process.env.NODE_ENV
  }

  const webpackConfig = {
    // entry: {
    //   // app: ['@babel/polyfill', './src/js/app.js']
    // }, //If you need support IE11
    output: {
      filename: 'app.js'
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/js')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
          options: {
            cacheDirectory: true
          }
        },
        {
          test: /\.glsl$/,
          exclude: '/node_modules/',
          loader: 'webpack-glsl-loader'
        }
      ]
    },
    mode: !isProduction ? 'development' : 'production',
    devtool: !isProduction ?
      'eval-cheap-module-source-map' :
      false,
    optimization: {
      minimize: isProduction,
      // splitChunks: {
      //   // include all types of chunks
      //   chunks: 'all',
      //   minSize: 1
      // }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      // @ts-ignore
      new ESLintPlugin({
        files: 'src/**/*.js',
        fix: true,
        formatter: require.resolve('eslint-formatter-pretty'),
        eslintPath: require.resolve('eslint')
      })
    ]
  }

  // if (isProduction) {
  //   // webpackConfig.plugins.push(
  //   //   new BundleAnalyzerPlugin({
  //   //     analyzerMode: 'server',
  //   //     analyzerPort: 5500,
  //   //     openAnalyzer: false
  //   //   })
  //   // )
  // }

  return webpackConfig
}

module.exports = createConfig
