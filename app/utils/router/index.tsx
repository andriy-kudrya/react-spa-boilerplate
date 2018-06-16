import { Router } from 'router5'

import { React, Component, bindComponent } from '../react'
import { dropFields } from '../object'

const { Provider: RouterProvider, Consumer } = React.createContext<Router>(undefined as any)

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    routeName: string
    routeParams?: any
}

interface InternalLinkProps extends LinkProps {
    router: Router
}

class InternalLink extends Component<InternalLinkProps> {
    constructor(props: InternalLinkProps) {
        super(props)
        bindComponent(this)
    }

    handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        if (this.props.onClick)
            this.props.onClick(event)

        const skip = event.button !== 0
            || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
            || event.defaultPrevented

        if (skip)
            return

        event.preventDefault()
        this.props.router.navigate(this.props.routeName, this.props.routeParams)
    }

    render() {
        const forwardedProps = dropFields(this.props, 'routeName', 'routeParams', 'router', 'onClick')
            , href = this.props.router.buildPath(this.props.routeName, this.props.routeParams)

        return <a {...forwardedProps} href={href} onClick={this.handleClick}/>
    }
}

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

const Link: React.SFC<LinkProps> = props =>
    <RouterConsumer children={
        _ => <InternalLink router={_} {...props}/>
    }/>

export {
    RouterProvider,
    RouterConsumer,
    Link,
}
