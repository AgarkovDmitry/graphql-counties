import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'

const compression = require('compression')
const path = require('path')
const webpack = require('webpack')
const whm = require('webpack-hot-middleware')
const wdm = require('webpack-dev-middleware')

const app = express()

app.server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '100kb' }))

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.resolve(__dirname)))
} else {
  app.use(express.static(`${__dirname}/dist`))
}

if (process.env.NODE_ENV === 'development') {
  const config = require('./webpack.config')
  const compiler = webpack(config)

  app.use(wdm(compiler, { noInfo: true, publicPath: config.output.publicPath, mode: 'development' }))
  app.use(whm(compiler))
}

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(5000, () => {
  console.log('main app listening on port 5000!\n')
})


module.exports = app; // for tests

