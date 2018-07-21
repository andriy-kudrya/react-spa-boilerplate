import AppError from '#/entities/app-error'
import { reducer, handler } from '#/utils/redux/reducer'
import { ADD_ERROR, REMOVE_ERROR } from './actions'

const defaultState: AppError[] = []

export default reducer(
    defaultState,
    handler(ADD_ERROR, (state, error) => state.concat(error)),
    handler(REMOVE_ERROR, (state, error) => state.filter(_ => _ !== error)),
)
