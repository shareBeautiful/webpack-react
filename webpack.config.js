const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/';
module.exports = {
    entry: './src/index.js', //相对路径
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js', //打包文件名
        publicPath: publicPath
    },
    devServer: {
		publicPath: publicPath,
		contentBase: path.resolve(__dirname, 'build'),
		inline: true,
        hot: true,
        port: 3000
    },
    
    // webpack最重要的配置都在modules（模块）里
    module: {
        rules: [ //配置加载器 loader可以处理不同的js（jsx, es6等）编译成js，less等编译成css
            /* jsx语法和babel的配置 */
            {
                test: /\.js[x]$/, //配置要处理的文件格式，一般使用正则表达式匹配
                loader: 'babel-loader', //使用的加载器名称
                query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                    presets: ['env', 'react'],
                    plugins: ['react-hot-loader/babel'],
                    exclude: './node_modules/' // 忽略这个文件夹
                },
            },

            /* eslint的配置 */
            // {
            //     test: /\.js[x]$/,
            //     enforce: 'pre', // 加载器的执行顺序，不设置为正常执行，pre（前）|post（后），eslint是检查代码规范，应该在编译前就执行
            //     loader: 'eslint-loader',
            // },

            /* postcss的配置 */
            // {
            //     test: /\.css/,
            //     //loader: 'style-loader!css-loader'
            //     /* 
            //     use: ExtractTextWebpackPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            //     */
            //     use: [
            //         {
            //             loader: 'style-loader', // 将解析后的样式嵌入js代码
            //         },
            //         { 
            //             loader: 'css-loader',// 将css转换成对象
            //             options: {
            //                 importLoaders: 1,
            //             }
            //         },
            //         {
            //             loader: 'postcss-loader',// postcss平台
            //             options: {
            //                 plugins: () => [ // postcss插件配置
            //                     require('autoprefixer'),
            //                     require('precss'),
            //                     require('postcss-flexbugs-fixes')
            //                 ]
            //             }
            //         }
            //     ]
            // },

            /* sass的配置 */
            {
                test: /\.scss$/,
                //loaders是依靠正则表达式来测试这个文件是不是这个loader来处理，所以test不能少
                loaders: ['style-loader','css-loader','sass-loader'],
                //loaders的处理顺序是从右向左，就是会先用sass-loader，其次css-loader，再次style-loader
            },

            /* 图片或者其他静态文件路径和base64的配置 */
            {
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                  limit: 10000, //1w字节以下大小的图片会自动转成base64
                }
            }
        ]
    },

    // plugins是用于扩展webpack功能的
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
}