const path = require('path')

const ROOT = path.resolve( __dirname, 'src' )
const DESTINATION = path.resolve( __dirname, 'dist' )

module.exports = {
    context: ROOT,

    target: 'node',

    entry: {
        'build': ['./build.ts'],
        'index': ['./generate/Generator.ts']
    },
    
    output: {
        filename: '[name].js',
        path: DESTINATION,
        library: '[name]',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:  'babel-loader'
            }
        ]
    },

    plugins: [],

    devtool: 'cheap-module-source-map'
}
