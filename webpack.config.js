const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  entry: {
    app: './src/index'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /.(ts|tsx)$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
      {
        test: /\.(css|scss)$/,
        include: path.resolve('./src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules',
          'sass-loader'
        ]
      },
      { test: /\.(jpe?g|png|svg|gif|pdf)$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', 'src']
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' })
  ]
}
