import { React, classnames } from '#/facade/react'
import { LOG_IN, CARDS } from '#/constants/routes'

import { Link, useRouter } from '#/utils/router'

const NavLink = (props: { routeName: string, children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <li className={classnames('nav-item', { active: router.isActive(props.routeName) })}>
            <Link className='nav-link' routeName={props.routeName}>
                {props.children} <span className='sr-only'>(current)</span>
            </Link>
        </li>
    )
}

const Nav = () =>
    <nav className='navbar navbar-expand sticky-top navbar-dark bg-dark'>
        <div className='navbar-brand'>Card viewer</div>
        <ul className='navbar-nav'>
            <NavLink routeName={LOG_IN}>Log In</NavLink>
            <NavLink routeName={CARDS}>Cards</NavLink>
        </ul>
    </nav>

export default Nav
