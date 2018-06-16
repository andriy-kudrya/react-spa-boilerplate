import { Auth } from '#/entities/state'
import { reducer, handler, shallowUpdate } from '#/utils/redux'
import { LOGGED_IN } from './actions'

export default reducer<Auth>(
    { id: '', login: '', token: '' },
    handler(LOGGED_IN, shallowUpdate)
)
