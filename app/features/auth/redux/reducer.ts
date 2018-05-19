import { Auth } from '#/entities/state'
import { reducer, handler, squash } from '#/utils/redux'
import { LOGGED_IN } from './actions'

export default reducer<Auth>({ id: '', login: '', token: '' },
    handler(LOGGED_IN, squash)
)
