import { Router } from 'router5'
import { React, Component } from '../react'

const { Provider: RouterProvider, Consumer } = React.createContext<Router>(undefined as any)

class RouterListener extends Component<React.ConsumerProps<Router> & { router: Router }> {
    componentDidMount() {
        this.componentWillUnmount = this.props.router.subscribe(
            _ => this.forceUpdate()
        )
    }

    render() {
        return this.props.children(this.props.router)
    }
}

const RouterConsumer: React.SFC<React.ConsumerProps<Router>> = props =>
    <Consumer children={
        _ => <RouterListener router={_} children={props.children} />
    }/>

export { RouterProvider, RouterConsumer }
