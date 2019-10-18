import * as React from 'react'
export { React }
export { useContext, useEffect, useLayoutEffect, useState, useMemo } from 'react'

export { connect } from 'react-redux'

import * as classnames from 'classnames'
export { classnames }

export { bindComponent } from '#/utils/react'

import AppState from '#/entities/app-state'
import { Func } from '#/utils/function'

export { compose } from '#/utils/redux/compose'
export { dispatchMapper, useAction } from '#/utils/redux/connect'

export { stateMapper }

/**
 * Only for type inference purpose, otherwise does nothing useful
 */
function stateMapper<S>(f: Func<[AppState], S>) {
    return f
}

import { useSelector as useSelectorGeneric } from 'react-redux'
export const useSelector: <T>(selector: (state: AppState) => T, equalityFn?: (left: T, right: T) => boolean) => T = useSelectorGeneric
