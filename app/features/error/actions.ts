import { creatorFactory } from '#/utils/redux'
import type AppError from '#/entities/app-error'

const creator = creatorFactory('app.error')

export const addError = creator<AppError>('ADD_ERROR')
           , removeError = creator<AppError>('REMOVE_ERROR')
