import { Store, combineReducers, ReducersMapObject } from 'redux'
import AppState from '#/entities/app-state'
import ServiceFactory from '#/services/service-factory'
import { assign } from '#/utils/object'
import { router5Reducer } from 'redux-router5'
import errors from '#/features/error/reducer'

import { AppModule, ReducerMap } from './types'
import authModuleFactory from './app-modules/auth'
import cardsModuleFactory from './app-modules/cards'
import { registerMiddleware } from './dynamic-middleware'

function appModuleLoaderFactory(store: Store<AppState>, services: ServiceFactory) {
    const currentReducer: ReducerMap = {
            router: router5Reducer,
            errors,
        }
        , result = {
            loadAuth,
            loadCards,
        }

    return result

    function loadAuth() {
        return load(authModuleFactory(services))
    }

    function loadCards() {
        return load(cardsModuleFactory(services))
    }

    function load(module: AppModule) {
        if (module.reducer) {
            assign(currentReducer, module.reducer)
            store.replaceReducer(
                combineReducers(currentReducer as ReducersMapObject<AppState>)
            )
        }

        module.middlewares.slice().reverse()
            .map(registerMiddleware)
            .forEach(store.dispatch)
    }
}

export default appModuleLoaderFactory