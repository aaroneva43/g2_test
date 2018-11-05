const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env = {}) => {

    // const pkgPath = path.resolve(__dirname, 'package.json');
    // const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};

    return {
        entry: {
            index: [SRC_DIR + '/index.js']
        },
        output: {
            path: BUILD_DIR,
            filename: '[name].bundle.' + new Date().Format('yyyyMMddhhmm') + '.js',
            publicPath: '/'
        },
        devtool: env.prod ? '' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: BUILD_DIR,
            historyApiFallback: true,
            host: "0.0.0.0",
            port: 5008,
            compress: true,
            hot: true,
            // open: true
            proxy: {
                '/rest/v1/**': { target: 'http://172.23.132.36', secure: false }

            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|public|build|tools)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            // presets: ['react', 'env'],
                            plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]
                        }
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.(scss)$/,
                    use: ['css-hot-loader'].concat(extractSCSS.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: { alias: { '../img': '../public/img' }, module: false }
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                    }))
                },
                {
                    test: /\.css$/,
                    use: extractCSS.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.less$/,
                    use: extractLess.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "less-loader"
                            }
                        ],
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    use: [
                        {
                            // loader: 'url-loader'
                            loader: 'file-loader',
                            options: {
                                name: './img/[name].[hash].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[hash].[ext]'
                    }
                }]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),

            new webpack.NamedModulesPlugin(),
            extractCSS,
            extractSCSS,
            new HtmlWebpackPlugin(
                {
                    inject: true,
                    template: './public/index.html'
                }
            ),
            new CopyWebpackPlugin([
                { from: './public/img', to: 'public/img' },
                // { from: './public/spec.json', to: 'public/spec.json' },
                // { from: './public/swagger.json', to: 'public/swagger.json' },
                { from: './public', to: 'public' }
            ],
                { copyUnmodified: false }
            )
        ].concat(env.prod ? []/* new webpack.optimize.UglifyJsPlugin({ sourceMap: true }) */ : []).
            concat(env.prod ? new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"production"'
                }
            }) : []),

        resolve: {
            alias: {
                '@src': path.resolve(__dirname, 'src')
            }
        }
    }
};

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

