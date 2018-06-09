import * as React from 'react'

import { mediatorFactory, SortMediator, SortSubject } from './sort'

const { Provider, Consumer } = React.createContext<SortMediator>(undefined as any)

class SortState extends React.Component {
    readonly _mediator = mediatorFactory()

    render() {
        return <Provider value={this._mediator} children={this.props.children}/>
    }
}

interface TargetState {
    sorted: boolean,
    ascending: boolean,
}

interface TargetProps {
    name: string
    mediator: SortMediator
    children: (value: TargetState & { onClick: React.MouseEventHandler<HTMLElement> }) => React.ReactNode
}

class SortTargetInternal extends React.Component<TargetProps, TargetState> {
    _sortSubject: SortSubject | undefined

    constructor(props: TargetProps) {
        super(props)
        this.state = { sorted: false, ascending: false }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        const { mediator, name } = this.props

        this._sortSubject = mediator.createSubject(
            name,
            (sorted, ascending) => this.setState({ sorted, ascending })
        )
    }

    componentWillUnmount() {
        this.props.mediator.removeSubject(this._sortSubject!)
    }

    handleClick() {
        this._sortSubject!.flipOrder()
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
        {_ => <SortTargetInternal mediator={_} name={props.name}>{props.children}</SortTargetInternal>}
    </Consumer>

export { SortState, SortTarget }
