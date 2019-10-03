import * as React from 'react'
import { Router } from 'router5'

import { dropFields } from '../object'

import { useRouter } from './context'

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
    routeName: string
    routeParams?: any
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement>, props: Props, router: Router) {
    if (props.onClick)
        props.onClick(event)

    const skip = event.button !== 0
        || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        || event.defaultPrevented

    if (skip)
        return

    event.preventDefault()
    router.navigate(props.routeName, props.routeParams)
}

const Link: React.FC<Props> = props => {
        const router = useRouter()
            , href = router.buildPath(props.routeName, props.routeParams)
            , forwardedProps = dropFields(props, 'routeName', 'routeParams', 'onClick')

        return <a {...forwardedProps} href={href} onClick={_ => handleClick(_, props, router)}/>
    }

export default Link
