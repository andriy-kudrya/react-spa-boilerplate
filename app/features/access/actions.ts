import { creatorFactory } from '#/utils/redux'
import { Auth } from '#/entities/auth'

const creator = creatorFactory('app.access')

export const calcAccess = creator<Auth>('CALC_ACCESS')
