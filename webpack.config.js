const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.ts',                // Entry point for the application
  output: {
    filename: 'bundle.js',              // Output bundle filename
    path: path.resolve(__dirname, 'dist'),
    clean: true                         // Clears old files in dist on build
  },
  devtool: 'source-map',                 // Generate source maps for easier debugging
  resolve: {
    extensions: ['.ts', '.js'],         // Resolve these extensions in imports
  },
  module: {
    rules: [
      {
        test: /\.ts$/,                  // Process all .ts files
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'   // Use `index.html` as the template
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // Serve static files from `public`
    },
    compress: true,
    port: 3000,                         // Development server port
    open: true,                         // Open the browser automatically
    hot: true                           // Enable hot module replacement
  },
};
