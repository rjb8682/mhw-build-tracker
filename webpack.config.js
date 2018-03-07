/**
 * This webpack config is for compiling the app ts files into js
 */
const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
    
    context: __dirname + "/src/ts",

    entry: "./index",

    output: {
        filename: "bundle.js",
        path: __dirname + "/app"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: [
            path.resolve('./node_modules')
        ]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                enforce: "pre",
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "app/")
                ],
                loader: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            }
        ]
    },

    node: {
        __dirname: false,
        __filename: false
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    configFile: "tslint.json"
                }
            }
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(process.env.GIT_VERSION),
            TARGET_TYPE: JSON.stringify(process.env.TARGET_TYPE)
        })
    ]
};

module.exports = webpackConfig;
