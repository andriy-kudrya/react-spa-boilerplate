const params = {}

export function initParams(env = {}) {
    Object.assign(params, {
        debug: !!env.debug,
        analyze: !!env.analyze,
    })
}

export default params