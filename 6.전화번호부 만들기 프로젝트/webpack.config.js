module.exports = {
    entry: ['react-hot-loader/patch', './src/index.js'],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname + '/public/'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react'],
            plugins: ['react-hot-loader/babel'] // HMR시 state를 유지하기위해
          },
          exclude: /node_modules/
        }
      ]
    },

    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
};
