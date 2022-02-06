import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export default {
  mode: 'development',
  target: 'node',
  entry: './src/index.js', 
  output: { 
    filename: 'bundle.js', 
    path: `${__dirname}/dist/`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // babelを通さないディレクトリ
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
