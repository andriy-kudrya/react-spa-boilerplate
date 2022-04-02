import params from './params.mjs'
import paths from './paths.mjs'
import plugins from './plugins.mjs'
import rules from './rules.mjs'
import devServer from './dev-server.mjs'

const config = {
    context: paths.app,
    entry: {
        app: [
            './bootstrap/main',
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
            '_': paths.app
        }
    },
    module: { rules },
    plugins,
    mode: params.debug ? 'development' : 'production',
    devtool: 'source-map',
    devServer,
    optimization: {
        emitOnErrors: false,
        runtimeChunk: { name: 'manifest' },
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                vendor: {
                    chunks: 'all',
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
