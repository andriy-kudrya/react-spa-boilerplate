import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'

import State from '#/entities/state'

import effectMwFactory, { EffectsFactory } from '#/utils/middleware/effect'

import auth from '#/features/auth/reducer'
import authEffectFactory from '#/features/auth/effects'
import authServiceFakeFactory from '#/services/fake/auth-service-fake'

import cards from '#/features/cards/reducer'
import cardsEffectFactory from '#/features/cards/effects'
import cardServiceFakeFactory from '#/services/fake/card-service-fake'

const rootReducer = combineReducers<State>({
    auth,
    cards,
    router: router5Reducer,
})

const effects = ([] as EffectsFactory[]).concat(
        cardsEffectFactory(cardServiceFakeFactory()),
        authEffectFactory(authServiceFakeFactory()),
    )
    , effectMw = effectMwFactory(effects)
    , middlewares = [effectMw]

export { rootReducer, middlewares }
