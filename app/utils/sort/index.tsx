import * as React from 'react'
import { useContext, useState, useCallback } from 'react'

import SortState from '#/entities/sort-state'

import useSubscription from '../react/use-subscription'

import { createSortState, SortStateManager, FieldState } from './sort'

const Context = React.createContext<SortStateManager>(undefined as any)

interface SortContainerProps {
    onChange: (state: SortState) => void
    children: React.ReactNode
}

function SortContainer(props: SortContainerProps) {
    const [state] = useState(() => createSortState(props.onChange))

    return <Context.Provider value={state} children={props.children}/>
}

const subscribe = (state: SortStateManager, callback: () => void) => state.subscribe(callback)
    , stateEqual = (one: FieldState, two: FieldState) => one.ascending === two.ascending && one.sorted === two.sorted

function useSort(name: string) {
    const state = useContext(Context)
        , onClick = useCallback(
            () => state.flip(name),
            [state, name]
        )
        , getSortState = useCallback(
            (state: SortStateManager) => state.getState(name),
            [name]
        )
        , sortState = useSubscription(state, subscribe, getSortState, stateEqual)

    return { onClick, ...sortState }
}

export { SortContainer, useSort }

