import { action } from '#/utils/redux'
import Error from '#/entities/error'

const ERROR = 'app.error'
    , error = action<Error>(ERROR)

export { ERROR, error }