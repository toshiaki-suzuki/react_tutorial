module.exports = {
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
