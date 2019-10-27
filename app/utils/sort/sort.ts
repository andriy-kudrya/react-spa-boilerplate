import SortState from '#/entities/sort-state'

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
    const enum Order { Asc, Desc }
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
                order: sortedField.order === Order.Asc ? Order.Desc : Order.Asc,
            }
        else
            sortedField = { name, order: Order.Asc }

        onChange(sortedField ? [{ name: sortedField.name, order: sortedField.order === Order.Asc ? 'asc' : 'desc' }] : [])
        notifyListeners()
    }

    function notifyListeners() {
        listeners.forEach(_ => _())
    }

    function getState(name: string): FieldState {
        return sortedField && sortedField.name === name
                ? { sorted: true, ascending: sortedField.order === Order.Asc }
                : { sorted: false, ascending: false }
    }
}

export { createSortState, SortStateManager, FieldState }
