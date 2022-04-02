import type { Middleware } from '_/utils/redux'
import type AppState from '_/entities/app-state'
import type AppError from '_/entities/app-error'

import { addError } from './actions'

const middleware: Middleware<AppState> = _api => next => {
    window.addEventListener('error', (event: ErrorEvent) => {
        next(addError(getAppError(event.error)))
    })

    return action => {
        try {
            const result: any = next(action)

            if (result && result.catch)
                return result.catch((reason: any) => next(addError(getAppError(reason))))

            return result
        }
        catch (error) {
            const appError = getAppError(error)
            next(addError(appError))
        }

    }

    function getAppError(error: any): AppError {
        if (error instanceof Error)
            return { message: error.message }

        if (typeof error === 'string')
            return { message: error }

        return { message: 'Unknown error occurred' }
    }
}
export default middleware
