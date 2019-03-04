import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import DynamicPlugin from './dynamic_plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const config = () => ({
  entry: [
    path.resolve('tmp', 'index.js'),
    path.resolve('tmp', 'index.less')
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          { loader: 'postcss-loader', options: {
            plugins: [autoprefixer, cssnano] }
          },
          'less-loader'
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              poolTimeout: Infinity
            }
          }, {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.join('tmp', '.cache'),
              plugins: ['react-hot-loader/babel'],
              presets: ['es2015', 'react', 'stage-0']
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors'
    },
    runtimeChunk: true
  },
  output: {
    path: path.resolve('public'),
    filename: path.join('js', 'bundle-[hash].min.js'),
    publicPath: '/'
  },
  plugins: [
    new DynamicPlugin(),
    new MiniCssExtractPlugin({
      path: path.resolve('public'),
      filename: path.join('css', 'bundle-[hash].min.css'),
      publicPath: '/'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'app','index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
        'WEB_HOST': JSON.stringify(process.env.WEB_CDN_HOST || process.env.WEB_HOST),
        'API_HOST': JSON.stringify(process.env.API_HOST),
        'ASSET_HOST': JSON.stringify(process.env.ASSET_CDN_HOST || process.env.ASSET_HOST)
      }
    })
  ]
})

export default config
