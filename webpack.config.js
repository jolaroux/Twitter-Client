var path = require('path')
console.log(path.resolve(__dirname + '/dist'))
var webpack = require("webpack")
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname + '/src'),
  entry: //['webpack-dev-server/client?http://localhost:8080',
    './entry.jsx', //'./src/test.js', './src/script.js', './src/Store.js'],//, './src/test.js', './src/script.js', './src/Store.js' /*, '/Users/jameslaroux/Desktop/Stuff/Programming/workingWPSD/main.js'*/],//['./src/index.jsx', './src/script.js', './src/test.js'],
  output: {
    path: path.resolve(__dirname + '/dist'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true
  },
  module: {
    rules: [
      //new 
      // {
      //   test: /\.html$/,
      //   loader: ExtractTextPlugin.extract('html?attrs=link:href')
      // },
      {
        test: /\.js?$/,
        loader: 'babel-loader',//,
        options: {
          "presets": [
            "es2015",
            "react"
          ],
          "plugins": [
            "transform-react-jsx",
            "transform-class-properties"
          ]
        },
        exclude: /(node_modules|bower_components)/
          // options: {
          //   presets: ['es2015', 'react'],
          //   plugins: ['transform-react-jsx', 'transform-class-properties']
          // }
        
      },
      {
        test: /\.html?$/,
        loader: 'html-loader',//,
        exclude: /(node_modules|bower_components)/
          // options: {
          //   presets: ['es2015', 'react'],
          //   plugins: ['transform-react-jsx', 'transform-class-properties']
          // }
        
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          "presets": [
            "es2015",
            "react"
          ],
          "plugins": [
            "transform-react-jsx",
            "transform-class-properties"
          ]
        },
        // options: {
        //   presets: ['es2015', 'react'],
        //   plugins: ['transform-react-jsx', 'transform-class-properties']
        // },
        exclude: /(node_modules|bower_components)///,
        
      },
      {
        test: /\.css$/, 
        //exclude: /(node_modules)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
        ]
        
      },
      // {
      //   test: /plugin\.css$/,
      //   loaders: [
      //     'style-loader', 'css-loader',
      //   ],
      // },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'json-loader'
        }
      }
      
    ],
    
    exprContextCritical: false,
    
  }
  ,target: 'electron',
  resolve: {
    alias: {
       'babel-register': 'babel-register/node_modules/core-js/index.js'
    }
  }, 
  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production")
    //   }
    // })
    //new webpack.optimize.UglifyJsPlugin()

    //new BabiliPlugin()
  
  ]
}







