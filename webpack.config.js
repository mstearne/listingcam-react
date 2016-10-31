module.exports = {
  
  // This code will be compiled by webpack according to the babel specifications
  entry: "./app/App.js",

  // The plain compiled Javascript will be output into this file
  output: {
    filename: "public/bundle.js"
  },


  // This will be what we do
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_moduled|bower_components)/,
        loader: 'babel',
        query: {
          // These are the specific transformations we'll be using. 
          presets: ['react', 'es2015']
        }
      },
  { test: /\.css$/,  loader: "style-loader!css-loader" },
  { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
  { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
  { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" }
    ]
  }

}
