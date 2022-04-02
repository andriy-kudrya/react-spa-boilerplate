import { Store, combineReducers, ReducersMapObject } from 'redux'
import { lazy } from 'react'
import type AppState from '_/entities/app-state'
import type ServiceFactory from '_/services/service-factory'
import { assign } from '_/utils/object'
import { memoizeLatestCall } from '_/utils/function'
import errors from '_/features/error/reducer'
import access from '_/features/access/reducer'

import type { AppModule } from './types'
import { registerMiddleware } from './dynamic-middleware'
import coreModuleFactory from './app-modules/core'

function appModuleLoaderFactory(store: Store<AppState>, services: ServiceFactory, defaultReducerMap: ReducersMapObject<AppState>) {
    const currentReducer = {
            ...defaultReducerMap,
            errors,
            access,
        }
        , result = {
            loadCore,
            loadAuth: memoizeLatestCall(loadAuth),
            loadCards: memoizeLatestCall(loadCards),
            loadDemo: memoizeLatestCall(loadDemo),
        }

    return result

    function loadCore() {
        return load(coreModuleFactory(services))
    }

    function loadAuth() {
        return lazy(
            () => import(/* webpackChunkName: 'auth' */ './app-modules/auth')
                .then(_ => _.default(services))
                .then(_ => {
                    load(_)
                    return { default: _.mainView! }
                })
        )
    }

    function loadCards() {
        return lazy(
            () => import(/* webpackChunkName: 'cards' */ './app-modules/cards')
                .then(_ => _.default(services))
                .then(_ => {
                    load(_)
                    return { default: _.mainView! }
                })
        )
    }

    function loadDemo() {
        return lazy(
            () => import(/* webpackChunkName: 'demo' */ './app-modules/demo')
                .then(_ => _.default(services))
                .then(_ => {
                    load(_)
                    return { default: _.mainView! }
                })
        )
    }

    function load(module: AppModule) {
        if (module.reducer) {
            assign(currentReducer, module.reducer)
            store.replaceReducer(
                combineReducers(currentReducer)
            )
        }

        module.middlewares.slice().reverse()
            .map(registerMiddleware)
            .forEach(store.dispatch)
    }
}

export default appModuleLoaderFactory
