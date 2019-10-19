import { React, classnames, useAccess } from '#/facade/react'
import { LOG_IN, CARDS } from '#/constants/routes'

import { Link, useRouter } from '#/utils/router'

interface NavLinkProps {
    routeName: string
    access?: boolean
    children: React.ReactNode
}

function NavLink(props: NavLinkProps) {
    const router = useRouter()

    if (props.access === false)
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
    const viewCards = useAccess('viewCards')

    return (
        <nav className='navbar navbar-expand sticky-top navbar-dark bg-dark'>
            <div className='navbar-brand'>Card viewer</div>
            <ul className='navbar-nav'>
                <NavLink routeName={LOG_IN}>Log In</NavLink>
                <NavLink routeName={CARDS} access={viewCards}>Cards</NavLink>
            </ul>
        </nav>
    )
}

export default Nav
