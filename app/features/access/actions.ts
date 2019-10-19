import { action, ActionType } from '#/utils/redux'
import { Auth } from '#/entities/auth'

const CALC_ACCESS: ActionType<Auth> = 'app.access.CALC_ACCESS'

const calcAccess = action(CALC_ACCESS)

export {
    CALC_ACCESS,

    calcAccess,
}
