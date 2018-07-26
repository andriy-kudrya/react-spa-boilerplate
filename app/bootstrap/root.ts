import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'

import AppState from '#/entities/app-state'

import effectMwFactory, { EffectsFactory } from '#/utils/redux/effect'

import apiServiceFactory from '#/services/impl/api-service'

import auth from '#/features/auth/reducer'
import authEffectFactory from '#/features/auth/effects'
import authServiceFakeFactory from '#/services/fake/auth-service-fake'

import cards from '#/features/cards/reducer'
import cardsEffectFactory from '#/features/cards/effects'
import cardServiceFakeFactory from '#/services/impl/card-service'

import errors from '#/features/error/reducer'
import errorMw from '#/features/error/middleware'

const rootReducer = combineReducers<AppState>({
    auth,
    cards,
    router: router5Reducer,
    errors,
})

const apiService = apiServiceFactory()
    , effects = ([] as EffectsFactory<AppState>[]).concat(
        cardsEffectFactory(cardServiceFakeFactory(apiService)),
        authEffectFactory(authServiceFakeFactory()),
    )
    , effectMw = effectMwFactory(effects)
    , middlewares = [errorMw, effectMw]

export { rootReducer, middlewares }
