import { creatorFactory } from '_/utils/redux'
import type { Auth } from '_/entities/auth'

const creator = creatorFactory('app.access')

export const calcAccess = creator<Auth>('CALC_ACCESS')
