const path = require('path')

const ROOT = path.resolve( __dirname, 'src' )
const DESTINATION = path.resolve( __dirname, 'dist' )

module.exports = {
    context: ROOT,

    target: 'node',

    entry: {
        'build': ['./build.ts'],
        'example': ['./example.ts']
    },
    
    output: {
        filename: '[name].js',
        path: DESTINATION
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
                loaders: ['babel-loader']
            }
        ]
    },

    plugins: []
}
