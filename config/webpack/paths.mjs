import { fileURLToPath } from 'url';
import { dirname, join } from 'path'
import params from './params.mjs'

const moduleDirectory = dirname(fileURLToPath(import.meta.url))
    , root = join(moduleDirectory, '..', '..')
    , app = join(root, 'app')
    , assets = join(root, 'assets')
    , output = join(root, 'dist')
    , config = join(root, 'config')
    , eslintConfigFile = join(config, 'eslint',
        params.debug ? 'dev.eslintrc.json' : 'prod.eslintrc.json'
    )
    , tsconfigFile = join(root, 'tsconfig.json')

export default {
    root,
    app,
    output,
    assets,
    eslintConfigFile,
    tsconfigFile,
}
