import * as React from 'react'
import { useLayoutEffect, useRef, useContext, useState, useCallback } from 'react'

import SortState from '#/entities/sort-state'

import { mediatorFactory, SortMediator, SortSubject } from './sort'

const Context = React.createContext<SortMediator>(undefined as any)

interface SortContainerProps {
    onChange: (state: SortState) => void
    children: React.ReactNode
}

function SortContainer(props: SortContainerProps) {
    const [mediator] = useState(() => mediatorFactory(props.onChange))

    return <Context.Provider value={mediator} children={props.children}/>
}

function useSort(name: string) {
    const mediator = useContext(Context)
        , [sortState, setSortState] = useState({ sorted: false, ascending: false })
        , subjectRef = useRef<SortSubject>()

    useLayoutEffect(
        () => {
            const subject = mediator.createSubject(
                name,
                (sorted, ascending) => setSortState({ sorted, ascending })
            )

            subjectRef.current = subject

            return () => mediator.removeSubject(subject)
        },
        [mediator]
    )

    const onClick = useCallback(
        () => {
            subjectRef.current!.flipOrder()
        },
        []
    )

    return { onClick, ...sortState}
}

export { SortContainer, useSort }
