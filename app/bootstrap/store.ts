import { createStore, applyMiddleware } from 'redux'
import { router5Middleware } from 'redux-router5'

import router from './routes'
import logMiddleware from '#/utils/middleware/log'

import { rootReducer, middlewares } from './root'

const store = createStore(rootReducer, applyMiddleware(logMiddleware, ...middlewares, router5Middleware(router)))

export default store
