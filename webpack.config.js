const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const extractSass = new ExtractTextPlugin({
    filename: '../css/[name].css'
});

module.exports = {
    entry: {
        main: './static_src/js/main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    publicPath: '/static/css/',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: {
                                    autoprefixer: false,
                                    discardComments: {
                                        removeAll: true
                                    },
                                    mergeRules: false,
                                    normalizeUrl: false,
                                    zindex: false
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')([
                                        'ie >= 10',
                                        'ie_mob >= 10',
                                        'ff >= 30',
                                        'chrome >= 35',
                                        'safari >= 7',
                                        'opera >= 28',
                                        'ios >= 8',
                                        'android >= 4'
                                    ])
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../assets/[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        extractSass,
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static_src/assets'),
                to: path.resolve(__dirname, './public/static/assets')
            }
        ]),
    ],
    output: {
        path: path.resolve(__dirname, './public/static/js'),
        publicPath: '/static/js/',
        filename: '[name].js'
    }
};
// If in production, use the minification (uglify) plugin
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

