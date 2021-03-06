const webpack = require('webpack');
const path = require('path');

const HtmlWebpackplugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
        index:['babel-polyfill','./src/index.js'],
        login:['./src/login.js']
    },

    output:{
        filename: 'bundle.[name].js',
        path: path.resolve(__dirname,'dist')
    },

    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_module/
            },{
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                }),
            },{
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    use:['css-loader','sass-loader'],
                    fallback: ['style-loader']
                }),
            },{
                test: /\.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 8192 //小于8192bytes时使用url-loader，返回dataURL
                            //默认配置fallback为‘file-loader’？
                        }
                    }
                ],
                exclude: /node_module/
            },{
                test: /\.(woff2?|eot|ttf|otf|svg|woff)/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:8192
                        }
                    }
                ],
                exclude: /node_module/
            }
        ]
    },

    resolve:{
        extensions: ['.js', '.jsx', '.css', 'scss'],
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            style: path.resolve(__dirname, 'src/style/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            libs: path.resolve(__dirname,'src/libs/')
        }
    },

    plugins:[
        new HtmlWebpackplugin({
            template: './src/template/index.ejs',
            title:'Page For Drag',  //ejs的嵌入语法 <%= => 不需要{} !!!
            inject: true,
            chunks:['index']
        }),
        new HtmlWebpackplugin({
            filename:'login.html',
            template: './src/template/login.ejs',
            title:'Login',
            inject: true,
            chunks:['login']
        }),
        new ExtractTextWebpackPlugin({
            filename:'style.css'
        }),
        new CleanWebpackPlugin('./dist',{
            verbose: true  //Write logs to console
        })
    ]
}

