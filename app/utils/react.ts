import { useReducer } from 'react'

const inc = (x: number) => x + 1
    , useForceUpdate = () => useReducer<React.Reducer<number, void>>(inc, 0)[1] as () => void

type ClassesParam = string | undefined | null | false

const classes = (...params: ClassesParam[]) => params.reduce<string>(
        (acc, v) => v ? acc.concat(' ', v) : acc,
        ''
    )

export { useForceUpdate, classes }
