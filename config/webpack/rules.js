import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import params from './params'
import paths from './paths'

const scssRule = {
        test: /\.(scss|sass)$/,
        use: [
            // params.debug ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: true,
                },
            },
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
                    postcssOptions: {
                        plugins: [autoprefixer],
                    }
                },
            },
            { loader: 'sass-loader' },
        ].filter(_ => _),
    }

const babelLoader = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-typescript',
                ['@babel/preset-env', {
                    targets: {
                        browsers: params.debug ? ['last 2 Chrome versions'] : ['last 2 versions', 'not ie < 11'],
                    },
                    modules: false,
                }],
                ['@babel/preset-react', {
                    development: params.debug,
                    runtime: 'automatic',
                }],
            ].filter(_ => _),
            plugins: [
                ['@babel/plugin-transform-runtime', {
                    corejs: false,
                    helpers: true,
                    regenerator: false,
                    useESModules: true,
                }],
                !params.debug && '@babel/plugin-transform-react-inline-elements',
                // note: must be a last plugin, otherwise compilation might break
                !params.debug && '@babel/plugin-transform-react-constant-elements',
            ].filter(_ => _),
        },
    }

const rules = [
    {
        test: /\.(?:j|t)sx?$/,
        include: paths.app,
        use: [babelLoader],
    },
    // {
    //     test: /\.tsx?$/,
    //     include: paths.app,
    //     use: [
    //         babelLoader,
    //         {
    //             loader: 'ts-loader',
    //             options: { transpileOnly: true },
    //         },
    //     ],
    // },
    scssRule,
].filter(_ => _)

export default rules
