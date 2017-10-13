var path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        app: ["./src/pixelheart.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "pixelheart.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "assets"),
        port: 3000
    },
    module: {
        loaders: [
            { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader' },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};