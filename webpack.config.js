module.exports = {
    entry: {
        v1: __dirname + "/src/tutorial1.tsx",
        v3: __dirname + "/src/tutorial3.tsx",
        v5: __dirname + "/src/tutorial5.tsx",
        v7: __dirname + "/src/tutorial7.tsx"
    },
    output: {
        path: __dirname + "/public/builds",
        filename: "bundle.[name].js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    }
};

