import params from './params'
import paths from './paths'
import plugins from './plugins'
import rules from './rules'
import devServer from './dev-server'

const config = {
    context: paths.app,
    entry: {
        app: [
            'promise-polyfill/src/polyfill',
            './bootstrap/main'
        ]
    },
    output: {
        path: paths.output,
        publicPath: '/',
        filename: '[name].js',
        // filename: params.debug ? '[name].js' : '[name].[chunkhash].js',
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
    devServer,
    optimization: {
        noEmitOnErrors: true,
        runtimeChunk: { name: 'manifest' },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: false,
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    // priority: 10,
                    enforce: true,
                },
            }
        }
    },
}

export default config
