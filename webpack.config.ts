import * as Dotenv from 'dotenv-webpack'
import * as HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { TypedCssModulesPlugin } from 'typed-css-modules-webpack-plugin'
import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const createConfig = (
  env: any,
  argv: webpack.Configuration
): webpack.Configuration => {
  const isProd = argv.mode === 'production'
  return {
    mode: argv.mode,
    devtool: false,
    stats: 'minimal',
    node: {
      fs: 'empty'
    },
    entry: {
      ui: './src/ui/index.tsx', // The entry point for your UI code
      main: './src/main/index.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.worker\.ts$/,
          loader: [
            {
              loader: 'worker-loader',
              options: { inline: true }
            }
          ]
        },

        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        {
          test: /\.css$/,
          loader: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|webp|svg)$/,
          loader: [{ loader: 'url-loader' }]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'],
      plugins: [new TsconfigPathsPlugin()]
    },
    plugins: [
      isProd ? new BundleAnalyzerPlugin() : () => {},
      // new webpack.EnvironmentPlugin(["NODE_ENV", "API_ROOT", "API_KEY"]),
      new webpack.EnvironmentPlugin({
        DEBUG: !isProd
      }),
      new Dotenv(),
      new TypedCssModulesPlugin({
        globPattern: 'src/**/*.css'
      }),
      new HtmlWebpackPlugin({
        template: './src/ui/index.html',
        filename: 'ui.html',
        inlineSource: '.(js)$',
        chunks: ['ui']
      }),
      new HtmlWebpackInlineSourcePlugin()
    ]
  }
}

export default createConfig
