'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
//////////////////////////////////////
/*
const express = require('express')
const app = express()
var appData = require('../db.json')
// json数据
var getNewsList = appData.getNewsList
// 编写路由
var apiRoutes = express.Router()
// 所有通过接口相关的api都会通过api这个路由导向到具体的路由
app.use('/api', apiRoutes)
// 找到devServer对象并在其后添加相关路由设置
*/
/////////////////////////////////////
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    /*before(app) {
      app.get('/api/getNewsList', (req, res) => {
      res.json({
        // 这里是你的json内容
      })
      })
    },*/    
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
/* //use jsonserver module 
var jsonServer = require('json-server') //引入文件
var apiServer = jsonServer.create(); //创建服务器
var apiRouter = jsonServer.router('db.json') //引入json 文件 ，这里的地址就是你json文件的地址，我再static下的建立了一个文件夹mock，然后把json文件放在里面
var middlewares = jsonServer.defaults(); //返回JSON服务器使用的中间件。
apiServer.use(middlewares)
apiServer.use('/api',apiRouter)
apiServer.listen( 9527 ,function(err){ //json服务器端口:9527
  if(err){
    console.log(err)
    return
  }
  else
    console.log('JSON Server is running')  //json server成功运行会在git bash里面打印出'JSON Server is running'
})*/
var port = process.env.PORT || config.dev.port
const express = require('express')
var apiServer = express()
var bodyParser = require('body-parser')
apiServer.use(bodyParser.urlencoded({ extended: true }))
apiServer.use(bodyParser.json())
var apiRouter = express.Router()
var fs = require('fs')
apiRouter.route('/:apiName')
.all(function (req, res) {
  fs.readFile('./db.json', 'utf8', function (err, data) {
    if (err) throw err
    var data = JSON.parse(data)
    if (data[req.params.apiName]) {
      res.json(data[req.params.apiName])  
    }
    else {
      res.send('no such api name')
    }
    
  })
})


apiServer.use('/api', apiRouter);
apiServer.listen(port+1, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:'+(port+1)+ '\n')
})
