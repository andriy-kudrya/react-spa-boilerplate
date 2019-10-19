import * as React from 'react'
export { React }

export { connect } from 'react-redux'

import * as classnames from 'classnames'
export { classnames }

export { bindComponent } from '#/utils/react'

import AppState from '#/entities/app-state'
import { Func } from '#/utils/function'

export { compose } from '#/utils/redux/compose'
export { dispatchMapper } from '#/utils/redux/connect'

export { stateMapper }

/**
 * Only for type inference purpose, otherwise does nothing useful
 */
function stateMapper<S>(f: Func<[AppState], S>) {
    return f
}
