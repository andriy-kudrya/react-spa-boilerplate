import paths from './paths.mjs'

export default {
    static: paths.output,
    historyApiFallback: true,
    proxy: {
        '/data': {
            target: 'http://cdn.steam.tools',
            headers: {
                referer: 'http://steam.tools/cards/'
            },
            changeOrigin: true,
            secure: false,
        }
    }
}
