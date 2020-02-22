import { createStore, applyMiddleware, combineReducers, ReducersMapObject } from 'redux'
import { router5Middleware, router5Reducer } from 'redux-router5'

import type AppState from '#/entities/app-state'

import logMiddleware from '#/utils/middleware/log'
import errorMiddleware from '#/features/error/middleware'
import router from '#/features/routing/router'

import createServiceFactory from '#/services/impl/service-factory'
import appModuleLoaderFactory from '#/module-loader/app-module-loader'
import { dynamicMiddleware } from '#/module-loader/dynamic-middleware'

import { reducer } from '#/utils/redux/reducer'
import errorsState from '#/features/error/default-state'
import access from '#/features/access/default-state'
import authState from '#/features/auth/default-state'
import cardsState from '#/features/cards/default-state'

const defaultReducerMap: ReducersMapObject<AppState> = {
        errors: reducer(errorsState),
        access: reducer(access),
        auth: reducer(authState),
        cards: reducer(cardsState),
        router: router5Reducer,
    }

const store = createStore(
        combineReducers(defaultReducerMap),
        applyMiddleware(logMiddleware, errorMiddleware, dynamicMiddleware, router5Middleware(router))
    )
    , services = createServiceFactory()
    , appModuleLoader = appModuleLoaderFactory(store, services, defaultReducerMap)

appModuleLoader.loadCore()

export default store
export { appModuleLoader }
