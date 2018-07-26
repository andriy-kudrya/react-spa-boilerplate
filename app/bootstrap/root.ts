import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'

import AppState from '#/entities/app-state'

import effectMwFactory, { EffectsFactory } from '#/utils/redux/effect'

import createServiceFactory from '#/services/impl/service-factory'

import auth from '#/features/auth/reducer'
import authEffectFactory from '#/features/auth/effects'

import cards from '#/features/cards/reducer'
import cardsEffectFactory from '#/features/cards/effects'

import errors from '#/features/error/reducer'
import errorMw from '#/features/error/middleware'

const rootReducer = combineReducers<AppState>({
    auth,
    cards,
    router: router5Reducer,
    errors,
})

const services = createServiceFactory()
    , effects = ([] as EffectsFactory<AppState>[]).concat(
        cardsEffectFactory(services.card()),
        authEffectFactory(services.auth()),
    )
    , effectMw = effectMwFactory(effects)
    , middlewares = [errorMw, effectMw]

export { rootReducer, middlewares }
