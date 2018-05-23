import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'

import State from '#/entities/state'

import auth from '#/features/auth/redux/reducer'
import authMwFactory from '#/features/auth/redux/middleware'
import authServiceFakeFactory from '#/services/fake/auth-service-fake'

import cards from '#/features/cards/reducer'
import cardsMwFactory from '#/features/cards/middleware'
import cardServiceFakeFactory from '#/services/fake/card-service-fake'

const rootReducer = combineReducers<State>({
    auth,
    cards,
    router: router5Reducer
})

const cardsMws = cardsMwFactory(cardServiceFakeFactory())
    , authMws = authMwFactory(authServiceFakeFactory())
    , middlewares = [...cardsMws, ...authMws]

export { rootReducer, middlewares }
