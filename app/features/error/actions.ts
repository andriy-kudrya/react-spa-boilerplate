import { action, ActionType } from '#/utils/redux'
import AppError from '#/entities/app-error'

const ADD_ERROR: ActionType<AppError> = 'app.error.ADD_ERROR'
    , REMOVE_ERROR: ActionType<AppError> = 'app.error.REMOVE_ERROR'

const addError = action(ADD_ERROR)
    , removeError = action(REMOVE_ERROR)

export {
    ADD_ERROR,
    REMOVE_ERROR,

    addError,
    removeError,
}
