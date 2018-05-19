import { Middleware } from 'redux'

const log: Middleware = _api => next => action => {
    const result = next(action)

    // eslint-disable-next-line
    // console.log('store', _api.getState())

    return result
}

export default log