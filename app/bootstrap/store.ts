import { createStore, applyMiddleware } from 'redux'
import { router5Middleware } from 'redux-router5'

import AppState from '#/entities/app-state'

import logMiddleware from '#/utils/middleware/log'
import errorMiddleware from '#/features/error/middleware'
import router from '#/features/routing/routes'

import createServiceFactory from '#/services/impl/service-factory'
import appModuleLoaderFactory from '#/module-loader/app-module-loader'
import { dynamicMiddleware } from '#/module-loader/dynamic-middleware'

const store = createStore(
        () => ({} as AppState),
        applyMiddleware(logMiddleware, errorMiddleware, dynamicMiddleware, router5Middleware(router))
    )
    , services = createServiceFactory()
    , appModuleLoader = appModuleLoaderFactory(store, services)

appModuleLoader.loadAuth()
appModuleLoader.loadCards()

export default store
