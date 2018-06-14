import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import params from './params'
import paths from './paths'

const scssRule = {
        test: /\.(scss)$/,
        use: [
            params.debug ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    minimize: !params.debug,
                    sourceMap: !params.debug,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [autoprefixer]
                }
            },
            { loader: 'sass-loader' },
        ]
    }

const babelLoader = {
        loader: 'babel-loader',
        options: {
            presets: [
                !params.debug && ['env', {
                    targets: {
                        browsers: ['last 2 versions', 'not ie < 11']
                    },
                    modules: false
                }],
                'react',
            ].filter(_ => _),
            plugins: [
                'syntax-dynamic-import',
                params.debug && 'transform-react-jsx-self',
                params.debug && 'transform-react-jsx-source',
                !params.debug && 'transform-react-inline-elements',
                // note: must be a last plugin, otherwise compilation might break
                !params.debug && 'transform-react-constant-elements',
            ].filter(_ => _)
        }
    }

const rules = [
    {
        test: /\.jsx?$/,
        include: paths.app,
        use: [babelLoader],
    },
    {
        test: /\.tsx?$/,
        include: paths.app,
        use: [
            babelLoader,
            {
                loader: 'ts-loader',
                options: { transpileOnly: true }
            }
        ],
    },
    {
        enforce: 'pre',
        include: paths.app,
        test: /\.jsx?$/,
        use: [{
            loader: 'eslint-loader',
            options: {
                configFile: paths.eslintConfigFile,
                emitError: true,
                failOnError: true,
                emitWarning: false,
                failOnWarning: false
            }
        }]
    },
    scssRule,
].filter(_ => _)

export default rules
