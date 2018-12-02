import { createStore, applyMiddleware } from 'redux'

import logMiddleware from '#/utils/middleware/log'
import { dynamicMiddleware, registerMiddleware } from '#/features/lazy-loading/dynamic-middleware'
import errorMiddleware from '#/features/error/middleware'

import { rootReducer, middlewares } from './root'

const store = createStore(rootReducer, applyMiddleware(logMiddleware, errorMiddleware, dynamicMiddleware))

middlewares.slice().reverse()
    .map(registerMiddleware)
    .forEach(store.dispatch)

export default store
