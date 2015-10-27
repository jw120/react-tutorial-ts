module.exports = {
    entry: {
        v01: __dirname + "/src/tutorial01.tsx",
        v03: __dirname + "/src/tutorial03.tsx",
        v05: __dirname + "/src/tutorial05.tsx",
        v07: __dirname + "/src/tutorial07.tsx",
        v10: __dirname + "/src/tutorial10.tsx",
        v14: __dirname + "/src/tutorial14.tsx",
        v19: __dirname + "/src/tutorial19.tsx",
        v20: __dirname + "/src/tutorial20.tsx"
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
