import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'
import { router5Middleware } from 'redux-router5'

import router from '#/features/routing/routes'

import AppState from '#/entities/app-state'

import effectMwFactory /*, { EffectsFactory }*/ from '#/utils/redux/effect'

import createServiceFactory from '#/services/impl/service-factory'

import auth from '#/features/auth/reducer'
import authEffectFactory from '#/features/auth/effects'

import cards from '#/features/cards/reducer'
import cardsEffectFactory from '#/features/cards/effects'

import errors from '#/features/error/reducer'

const rootReducer = combineReducers<AppState>({
    auth,
    cards,
    router: router5Reducer,
    errors,
})

const services = createServiceFactory()
    // , effects = ([] as EffectsFactory<AppState>[]).concat(
    //     cardsEffectFactory(services.card()),
    //     authEffectFactory(services.auth()),
    // )
    // , effectMw = effectMwFactory(effects)
    , routerMw = router5Middleware(router)
    , authMw = effectMwFactory([authEffectFactory(services.auth())])
    , cardsMw = effectMwFactory([cardsEffectFactory(services.card())])
    , middlewares = [authMw, cardsMw, routerMw]

export { rootReducer, middlewares }
