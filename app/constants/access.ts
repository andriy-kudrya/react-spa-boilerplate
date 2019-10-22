import { ModuleEnum } from '#/utils/module-enum'
import * as self from './access'

export const LOG_IN = 'logIn'
           , VIEW_CARDS = 'viewCards'
           , DEMO = 'demo'

export type Access = ModuleEnum<typeof self, string>
