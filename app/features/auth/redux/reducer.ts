import { Auth } from '#/entities/state'
import { reducer, handler } from '#/utils/redux'
import { shallowUpdate } from '#/utils/object'
import { LOGGED_IN } from './actions'

export default reducer<Auth>({ id: '', login: '', token: '' },
    handler(LOGGED_IN, shallowUpdate)
)
