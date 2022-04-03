import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

import params from './params.mjs'
import paths from './paths.mjs'

const plugins = [
    new ForkTsCheckerWebpackPlugin({
        formatter: 'codeframe',
        typescript: {
            configFile: paths.tsconfigFile,
        },
        // eslint: {
        //     enabled: true,
        //     files: './**/*.{ts,tsx}',
        //     options: {
        //         overrideConfigFile: paths.eslintConfigFile,
        //     }
        // },
    }),
    // new ESLintPlugin({
    //     overrideConfigFile: paths.eslintConfigFile,
    //     extensions: ['ts', 'tsx'],
    //     formatter: 'codeframe',
    // }),
    new webpack.DefinePlugin({
        DEBUG: JSON.stringify(params.debug),
        API: JSON.stringify(params.api),
        'process.env.NODE_ENV': JSON.stringify(params.debug ? 'development' : 'production'),
    }),
    new HtmlPlugin({
        filename: 'index.html',
        template: `${paths.assets}/index.html`,
    }),
    params.analyze && new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new webpack.ProvidePlugin({
        _debug: '_/shared/debug.js',
    }),
    new CleanWebpackPlugin(),
].filter(_ => _)

export default plugins
