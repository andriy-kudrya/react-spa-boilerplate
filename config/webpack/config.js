import params from './params'
import paths from './paths'
import plugins from './plugins'
import rules from './rules'

const config = {
    context: paths.app,
    entry: {
        app: [
            'core-js/es/array',
            'core-js/es/object',
            'core-js/es/promise',
            'core-js/es/string',
            'core-js/es/map',
            'core-js/es/set',

            './bootstrap/main'
        ]
    },
    output: {
        path: paths.output,
        publicPath: '/',
        filename: params.debug ? '[name].js' : '[name].[chunkhash].js',
        pathinfo: params.debug
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.local.json', '.json'],
        alias: {
            '#': paths.app
        }
    },
    module: { rules },
    plugins,
    mode: params.debug ? 'development' : 'production',
    devtool: 'source-map',
    devServer: {
        contentBase: paths.output,
        historyApiFallback: true
    },
    optimization: {
        noEmitOnErrors: true,
        runtimeChunk: { name: 'manifest' },
        splitChunks: {
            chunks: 'all',
            name: true,
            cacheGroups: {
                vendor(module) {
                    return module.context && module.context.includes('node_modules');
                },
            }
        }
    },
}

export default config
