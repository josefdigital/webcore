const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./public/ts/index.ts",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "../fonts/[name][ext]",
                },
            }
        ],
    },
    resolve: {
        extensions: [".css", ".tsx", ".ts", ".js", ".scss", ".jpg", ".png", ".woff2"],
    },
    output: {
        filename: "[name].bundle.js",
        // chunkFilename: "[contenthash].bundle.js",
        path: path.resolve(__dirname, "static/js"),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/[name].bundle.css",
        }),
        new webpack.DefinePlugin({
            // "process.env.SEARCH_API_URL": JSON.stringify(process.env.SEARCH_API_URL) || JSON.stringify("http://localhost:8002/api/v0.1"),
        }),
        new webpack.ProvidePlugin({
            popper: "popper",
            bootstrap: "bootstrap",
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            name(module) {
                const resource = module.nameForCondition && module.nameForCondition();
                if (!resource) return;

                if (resource.includes("bootstrap")) return "bootstrap";
                if (resource.includes("bootstrap-icons")) return "icons";
                if (resource.includes("node_modules")) return "vendor";
            }
        }
    }
};
