import type SortState from '_/entities/sort-state'

interface SortStateManager {
    subscribe(listener: () => void): () => void
    flip(name: string): void
    getState(name: string): { sorted: boolean, ascending: boolean }
}

interface FieldState {
    sorted: boolean
    ascending: boolean
}

function createSortState(onChange: (state: SortState) => void): SortStateManager {
    const ORDER_ASC = 0
        , ORDER_DESC = 1

    type Order = typeof ORDER_ASC | typeof ORDER_DESC
    type SortedField = { name: string, order: Order }

    let listeners: (() => void)[] = []
      , sortedField: SortedField | undefined

    return {
        subscribe,
        flip,
        getState,
    }

    function subscribe(listener: () => void): () => void {
        listeners = listeners.concat(listener)

        return () => {
            listeners = listeners.filter(_ => _ !== listener)
        }
    }

    function flip(name: string): void {
        if (sortedField && sortedField.name === name)
            sortedField = {
                name,
                order: sortedField.order === ORDER_ASC ? ORDER_DESC : ORDER_ASC,
            }
        else
            sortedField = { name, order: ORDER_ASC }

        onChange(sortedField ? [{ name: sortedField.name, order: sortedField.order === ORDER_ASC ? 'asc' : 'desc' }] : [])
        notifyListeners()
    }

    function notifyListeners() {
        listeners.forEach(_ => _())
    }

    function getState(name: string): FieldState {
        return sortedField && sortedField.name === name
                ? { sorted: true, ascending: sortedField.order === ORDER_ASC }
                : { sorted: false, ascending: false }
    }
}

export { createSortState, SortStateManager, FieldState }
