const webpackReal = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


function createConfig(env) {
  let isProduction,
    webpackConfig

  if (env === undefined) {
    env = process.env.NODE_ENV
  }

  isProduction = env === 'production'

  webpackConfig = {
    // entry: {
    //   // app: ['@babel/polyfill', './src/js/app.js']
    // }, //If you need support IE11
    output: {
      filename: 'app.js'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/js/')
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: '/node_modules/',
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            ignorePattern: __dirname + '/src/js/lib/'
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.glsl$/,
          loader: 'webpack-glsl-loader'
        }
      ]
    },
    mode: !isProduction ? 'development' : 'production',
    devtool: !isProduction ?
      '#cheap-module-eval-source-map' :
      'none',
    optimization: {
      minimize: isProduction
    },
    plugins: [
      new webpackReal.LoaderOptionsPlugin({
        options: {
          eslint: {
            formatter: require('eslint-formatter-pretty')
          }
        }
      }),
      new webpackReal.NoEmitOnErrorsPlugin()
    ]
  }

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpackReal.LoaderOptionsPlugin({
        minimize: true,
      })
    )
    // webpackConfig.plugins.push(

    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'server',
    //     analyzerPort: 5500,
    //     openAnalyzer: false
    //   })
    // )
  }

  return webpackConfig
}

module.exports = createConfig()
module.exports.createConfig = createConfig
