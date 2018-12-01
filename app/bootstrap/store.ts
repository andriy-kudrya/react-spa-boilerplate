import { createStore, applyMiddleware } from 'redux'

import logMiddleware from '#/utils/middleware/log'
import { compositeMiddleware, registerMiddleware } from '#/utils/middleware/composite-middleware'
import errorMiddleware from '#/features/error/middleware'

import { rootReducer, middlewares } from './root'

const store = createStore(rootReducer, applyMiddleware(logMiddleware, errorMiddleware, compositeMiddleware))

middlewares.slice().reverse()
    .map(registerMiddleware)
    .forEach(store.dispatch)

export default store
