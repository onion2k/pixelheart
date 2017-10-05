var path = require("path");

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
        contentBase: path.join(__dirname, "assets")
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};