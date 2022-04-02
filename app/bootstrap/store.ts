import { createStore, applyMiddleware, combineReducers, ReducersMapObject } from 'redux'
import { router5Middleware, router5Reducer } from 'redux-router5'

import type AppState from '_/entities/app-state'

import logMiddleware from '_/utils/middleware/log'
import errorMiddleware from '_/features/error/middleware'
import router from '_/features/routing/router'

import createServiceFactory from '_/services/impl/service-factory'
import appModuleLoaderFactory from '_/module-loader/app-module-loader'
import { dynamicMiddleware } from '_/module-loader/dynamic-middleware'

import { reducer } from '_/utils/redux/reducer'
import errorsState from '_/features/error/default-state'
import access from '_/features/access/default-state'
import authState from '_/features/auth/default-state'
import cardsState from '_/features/cards/default-state'

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
