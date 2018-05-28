import params from './params'
import paths from './paths'

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
            { loader: 'ts-loader' }
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
    }
].filter(_ => _)

export default rules
