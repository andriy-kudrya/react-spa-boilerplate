import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import params from './params'
import paths from './paths'

const scssRule = {
        test: /\.(scss|sass)$/,
        use: [
            // params.debug ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: !params.debug,
                },
            },
            !params.debug && {
                loader: 'clean-css-loader',
                options: {
                    level: 2,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [autoprefixer],
                },
            },
            { loader: 'sass-loader' },
        ].filter(_ => _),
    }

const babelLoader = {
        loader: 'babel-loader',
        options: {
            presets: [
                !params.debug && ['@babel/preset-env', {
                    targets: {
                        browsers: ['last 2 versions', 'not ie < 11'],
                    },
                    modules: false,
                }],
                '@babel/preset-react',
            ].filter(_ => _),
            plugins: [
                ['@babel/plugin-transform-runtime', {
                    corejs: false,
                    helpers: true,
                    regenerator: false,
                    useESModules: true,
                }],
                '@babel/plugin-syntax-dynamic-import',
                params.debug && '@babel/plugin-transform-react-jsx-self',
                params.debug && '@babel/plugin-transform-react-jsx-source',
                !params.debug && '@babel/plugin-transform-react-inline-elements',
                // note: must be a last plugin, otherwise compilation might break
                !params.debug && '@babel/plugin-transform-react-constant-elements',
            ].filter(_ => _),
        },
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
                options: { transpileOnly: true },
            },
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
                formatter: 'codeframe',
                emitError: true,
                failOnError: true,
                emitWarning: false,
                failOnWarning: false,
            },
        }],
    },
    scssRule,
].filter(_ => _)

export default rules
