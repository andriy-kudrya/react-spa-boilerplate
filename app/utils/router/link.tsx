import * as React from 'react'
import type { Router } from 'router5'

import { omit } from '../object'

import { useRouter } from './context'

interface Props extends Omit<React.HTMLAttributes<HTMLAnchorElement>, 'href'> {
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

function Link(props: Props, ref: React.Ref<HTMLAnchorElement>) {
    const router = useRouter()
        , href = router.buildPath(props.routeName, props.routeParams)
        , forwardedProps = omit(props, 'routeName', 'routeParams', 'onClick')

    return <a ref={ref} {...forwardedProps} href={href} onClick={_ => handleClick(_, props, router)}/>
}

export default React.forwardRef(Link)
