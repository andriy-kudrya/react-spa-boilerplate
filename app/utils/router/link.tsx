import { Router } from 'router5'

import { React } from '../react'
import { dropFields } from '../object'

import { RouterConsumer } from './context'

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
    routeName: string
    routeParams?: any
}

interface InternalProps extends Props {
    router: Router
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement>, props: InternalProps) {
    if (props.onClick)
        props.onClick(event)

    const skip = event.button !== 0
        || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        || event.defaultPrevented

    if (skip)
        return

    event.preventDefault()
    props.router.navigate(props.routeName, props.routeParams)
}

const InternalLink: React.SFC<InternalProps> = props => {
        const forwardedProps = dropFields(props, 'routeName', 'routeParams', 'router', 'onClick')
            , href = props.router.buildPath(props.routeName, props.routeParams)

        return <a {...forwardedProps} href={href} onClick={_ => handleClick(_, props)}/>
    }

const Link: React.SFC<Props> = props =>
    <RouterConsumer children={
        _ => <InternalLink router={_} {...props}/>
    }/>

export default Link
