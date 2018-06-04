import * as React from 'react'

const enum Order { None, Asc, Desc }

type State = { name: string, ascending: boolean }[]

interface StateObserver {
    notify(order: Order): void
}

interface StateObservable {
    subscribe(name: string, observer: StateObserver): Unsubscribe
    sort(name: string): void
}

interface Unsubscribe {
    (): void
}

const { Provider, Consumer } = React.createContext<StateObservable>(undefined as any)

class SortState extends React.Component<{ state?: State }> implements StateObservable {
    _observers = new Map<string, { observer: StateObserver, order: Order }>()

    constructor(props: { state: State }) {
        super(props)

    }

    subscribe(name: string, observer: StateObserver): Unsubscribe {
        if (this._observers.has(name))
            throw new Error(`Sort target with name '${name}' already exists`)

        this._observers.set(name, { observer, order: Order.None })
        this.notifyObserver(name)
        return () => { this._observers.delete(name) }
    }

    sort(name: string): void {
        this._observers.forEach((eachValue, eachName) => {
            if (name !== eachName) {
                eachValue.order = Order.None
            }
            else {
                eachValue.order = eachValue.order === Order.Asc ? Order.Desc : Order.Asc
            }
            this.notifyObserver(eachName)
        })
    }

    notifyObserver(name: string): void {
        const observer = this._observers.get(name)

        if (!observer)
            throw Error(`Cannot find sort target ${name}`)

        observer.observer.notify(observer.order)
    }

    render() {
        const { children } = this.props

        return (
            <Provider value={this}>
                {children}
            </Provider>
        )
    }
}

interface SortTargetInternalProps {
    name: string
    observable: StateObservable
    children: (value: { sorted: boolean, ascending: boolean, onClick: React.MouseEventHandler<HTMLElement> }) => React.ReactNode
}

interface SortTargetInternalState {
    sorted: boolean
    ascending: boolean
}

class SortTargetInternal extends React.Component<SortTargetInternalProps, SortTargetInternalState> implements StateObserver {
    constructor(props: SortTargetInternalProps) {
        super(props)
        this.state = { sorted: false, ascending: false }
        this.componentWillUnmount = props.observable.subscribe(props.name, this)
        this.handleClick = this.handleClick.bind(this)
    }

    notify(order: Order): void {
        const sorted = order !== Order.None
            , ascending = order === Order.Asc

        if (sorted === this.state.sorted)
            if (sorted === false || ascending === this.state.ascending)
                return

        this.setState({
            sorted,
            ascending,
        })
    }

    handleClick() {
        this.props.observable.sort(this.props.name)
    }

    render() {
        return this.props.children(Object.assign({ onClick: this.handleClick }, this.state))
    }
}

interface SortTargetProps {
    name: string
    children: (value: { sorted: boolean, ascending: boolean, onClick: React.MouseEventHandler<HTMLElement> }) => React.ReactNode
}

const SortTarget: React.SFC<SortTargetProps> = props =>
    <Consumer>
        {_ => <SortTargetInternal observable={_} name={props.name}>{props.children}</SortTargetInternal>}
    </Consumer>


export { SortState, SortTarget }
