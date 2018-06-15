import path from 'path'
import params from './params'

const root = path.join(__dirname, '..', '..')
    , app = path.join(root, 'app')
    , assets = path.join(root, 'assets')
    , output = path.join(root, 'dist')
    , config = path.join(root, 'config')
    , eslintConfigFile = path.join(config, 'eslint',
        params.debug ? 'dev.eslintrc.json' : 'prod.eslintrc.json'
    )
    , tslintConfigFile = path.join(config, 'tslint', 'tslint.json')
    , tsconfigFile = path.join(root, 'tsconfig.json')
    , babelHelpers = path.join(config, 'babel')

export default {
    root,
    app,
    output,
    assets,
    eslintConfigFile,
    tslintConfigFile,
    tsconfigFile,
    babelHelpers,
}
