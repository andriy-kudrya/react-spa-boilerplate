import { action, ActionType } from '#/utils/redux'
import Error from '#/entities/error'

const ERROR: ActionType<Error> = 'app.error'
    , error = action(ERROR)

export { ERROR, error }
