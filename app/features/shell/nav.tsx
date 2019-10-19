import { React, classnames } from '#/facade/react'
import { useAccess } from '#/facade/hooks'
import * as routes from '#/constants/routes'
import * as access from '#/constants/access'

import { Link, useRouter } from '#/utils/router'

interface NavLinkProps {
    routeName: string
    access: access.Access
    children: React.ReactNode
}

function NavLink(props: NavLinkProps) {
    const router = useRouter()
        , access = useAccess(props.access)

    if (!access)
        return null

    return (
        <li className={classnames('nav-item', { active: router.isActive(props.routeName) })}>
            <Link className='nav-link' routeName={props.routeName}>
                {props.children} <span className='sr-only'>(current)</span>
            </Link>
        </li>
    )
}

function Nav() {
    return (
        <nav className='navbar navbar-expand sticky-top navbar-dark bg-dark'>
            <div className='navbar-brand'>Card viewer</div>
            <ul className='navbar-nav'>
                <NavLink routeName={routes.LOG_IN} access={access.LOG_IN}>Log In</NavLink>
                <NavLink routeName={routes.CARDS} access={access.CARDS}>Cards</NavLink>
            </ul>
        </nav>
    )
}

export default Nav
