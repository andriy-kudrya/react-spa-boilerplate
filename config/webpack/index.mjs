import { initParams } from './params.mjs'

export default (env) => {
    initParams(env)
    return import('./config.mjs').then(_ => _.default)
}
