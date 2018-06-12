import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import params from './params'
import paths from './paths'

const plugins = [
    new ForkTsCheckerWebpackPlugin({
        tsconfig: paths.tsconfigFile,
        tslint: paths.tslintConfigFile,
        formatter: 'codeframe',
    }),
    new webpack.DefinePlugin({
        DEBUG: JSON.stringify(params.debug),
        'process.env.NODE_ENV': JSON.stringify(params.debug ? 'development' : 'production'),
    }),
    new HtmlPlugin({
        filename: 'index.html',
        template: `${paths.assets}/index.html`
    }),
    params.analyze && new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new webpack.ProvidePlugin({
        _debug: '#/shared/debug.js'
    }),
    new CleanPlugin(['dist'], {
        root: paths.root,
    }),
].filter(_ => _)

export default plugins
