import { hasAccess, defaultRoute } from '../helpers'
import Middleware from './interface'

const accessMw: Middleware = (store, toState) => {
    const access = store.getState().access
        , allowTransition = hasAccess(toState.name, access)

    if (allowTransition)
        return true

    return Promise.reject({
        redirect: { name: defaultRoute(access) },
        message: 'Access denied',
    })
}

export default accessMw
